# ============================================
# Node.js version
# ============================================

# Upgrading the runtime: change .node-version. The deploy workflow passes it
# in here, and CI sets up the same version from that file, so nothing else
# needs editing. For a local build:
#   docker build --build-arg NODE_VERSION=$(cat .node-version) .
ARG NODE_VERSION
ARG NODE_VARIANT=slim

# ============================================
# Stage 1: Install dependencies
# ============================================

FROM node:${NODE_VERSION}-${NODE_VARIANT} AS dependencies

ENV NPM_CONFIG_REGISTRY=https://nexus.local.remy.lol/repository/npm-group/
ENV COREPACK_NPM_REGISTRY=https://nexus.local.remy.lol/repository/npm-group/

WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
  corepack enable pnpm && pnpm install --frozen-lockfile

# ============================================
# Stage 2: Build the static site and the server bundle
# ============================================

FROM node:${NODE_VERSION}-${NODE_VARIANT} AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV CI=true

# Lint and typecheck run as a separate CI pipeline gate (see
# .github/workflows/deploy.yml) before this image is ever built, so they are
# not repeated here.

# Produces dist/client (prerendered pages and assets) and dist/server (a
# single dependency-free index.js bundle).
RUN corepack enable pnpm && pnpm build

# ============================================
# Stage 3: Run
# ============================================

FROM node:${NODE_VERSION}-${NODE_VARIANT} AS runner

# The server only needs the node binary, so drop the package managers bundled
# with the base image; they are unused here and account for most of its
# vulnerability-scanner findings.
RUN rm -rf /usr/local/lib/node_modules /opt/yarn-* \
  /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
  /usr/local/bin/yarn /usr/local/bin/yarnpkg

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# No node_modules: the server bundle has no runtime dependencies. Files stay
# root-owned so the unprivileged process can read but not modify them.
COPY --from=builder /app/dist/client ./client
COPY --from=builder /app/dist/server ./server

USER node

EXPOSE 3000

# OPEN_WEATHER_API_KEY must be provided at runtime (e.g. in Portainer).
CMD ["node", "server/index.js"]
