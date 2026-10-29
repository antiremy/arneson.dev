import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getRequestLocation, getSimplifiedWeatherData } from "./weather.ts";

// The build writes this bundle to dist/server and the prerendered site to
// dist/client; the runtime image keeps the same layout.
const STATIC_DIR = fileURLToPath(new URL("../client/", import.meta.url));
const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "0.0.0.0";

const CONTENT_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".eot": "application/vnd.ms-fontobject",
};

interface StaticFile {
  path: string;
  size: number;
  etag: string;
}

async function findFile(pathname: string): Promise<StaticFile | null> {
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  if (decoded.includes("\0")) {
    return null;
  }

  // Prerendered routes live at <route>/index.html, so /monitr resolves to
  // monitr/index.html the same way / resolves to index.html.
  for (const candidate of [decoded, join(decoded, "index.html")]) {
    // join() normalizes away any ../ segments; anything that still lands
    // outside the static root (which ends in a separator) is rejected.
    const path = join(STATIC_DIR, candidate);
    if (!path.startsWith(STATIC_DIR)) {
      return null;
    }

    try {
      const stats = await stat(path);
      if (stats.isFile()) {
        return {
          path,
          size: stats.size,
          etag: `W/"${stats.size.toString(16)}-${stats.mtimeMs.toString(16)}"`,
        };
      }
    } catch {
      // Not found; try the next candidate.
    }
  }

  return null;
}

function sendFile(
  req: IncomingMessage,
  res: ServerResponse,
  file: StaticFile,
  status: number,
  cacheControl: string,
) {
  res.setHeader(
    "Content-Type",
    CONTENT_TYPES[extname(file.path)] ?? "application/octet-stream",
  );
  res.setHeader("Cache-Control", cacheControl);
  res.setHeader("ETag", file.etag);

  if (status === 200 && req.headers["if-none-match"] === file.etag) {
    res.writeHead(304).end();
    return;
  }

  res.setHeader("Content-Length", file.size);
  res.writeHead(status);
  if (req.method === "HEAD") {
    res.end();
    return;
  }

  createReadStream(file.path)
    .on("error", (e) => {
      console.error(e);
      res.destroy();
    })
    .pipe(res);
}

async function handleWeather(req: IncomingMessage, res: ServerResponse) {
  const weather = await getSimplifiedWeatherData(
    getRequestLocation(req.headers),
  );
  const body = JSON.stringify(weather);

  res.writeHead(200, {
    "Content-Type": CONTENT_TYPES[".json"],
    "Content-Length": Buffer.byteLength(body),
    // The response is specific to the visitor's location.
    "Cache-Control": "private, no-store",
  });
  res.end(req.method === "HEAD" ? undefined : body);
}

async function handle(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  const url = new URL(req.url ?? "/", "http://localhost");
  const { pathname } = url;

  if (pathname === "/api/weather") {
    await handleWeather(req, res);
    return;
  }

  // Match Next's canonical URLs by redirecting /monitr/ to /monitr. Leading
  // slashes are collapsed so //example.com/ can't become an off-site redirect.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const target = "/" + pathname.replace(/^\/+|\/+$/g, "");
    res.writeHead(308, { Location: target + url.search }).end();
    return;
  }

  const file = await findFile(pathname);
  if (file) {
    // Vite content-hashes everything under /assets, so those never change.
    const cacheControl = pathname.startsWith("/assets/")
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate";
    sendFile(req, res, file, 200, cacheControl);
    return;
  }

  const notFound = await findFile("/404.html");
  if (notFound) {
    sendFile(req, res, notFound, 404, "public, max-age=0, must-revalidate");
    return;
  }
  res.writeHead(404).end();
}

const server = createServer((req, res) => {
  handle(req, res).catch((e) => {
    console.error(e);
    if (!res.headersSent) {
      res.writeHead(500);
    }
    res.end();
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});

// Docker sends SIGTERM on stop; finish in-flight requests rather than waiting
// out the 10 second kill timeout.
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    server.closeIdleConnections();
    setTimeout(() => process.exit(0), 5000).unref();
  });
}
