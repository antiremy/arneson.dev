# arneson.dev

React 19 + Vite 8 + Tailwind 4, with React Router 8 in data mode. There is no
Next.js and no runtime SSR:

- `src/entry-server.tsx` + `scripts/prerender.mjs` prerender every route to
  static HTML at build time; `src/main.tsx` hydrates it.
- Per-page `<head>` tags come from each route's `handle` (`PageMeta`), rendered
  by `src/head.tsx`.
- `server/index.ts` is the only runtime code: a `node:http` server with no
  dependencies that serves `dist/client` and `/api/weather`. Keep it free of
  npm dependencies so the runtime image needs no `node_modules`.
- Node.js version lives in `.node-version` (CI and Docker both read it).
