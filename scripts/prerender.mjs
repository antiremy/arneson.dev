// Runs after the client and SSR builds: renders every page into the client
// build's index.html template so each route ships complete HTML (and its own
// <head> tags for crawlers and link previews), then drops the SSR bundle,
// which is only needed at build time.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";

const clientDir = new URL("../dist/client/", import.meta.url);
const ssrDir = new URL("../dist/ssr/", import.meta.url);

const { pages, render, sitemapXml } = await import(
  new URL("entry-server.js", ssrDir).href
);
const template = await readFile(new URL("index.html", clientDir), "utf8");

for (const { path, file } of pages) {
  const { head, html } = await render(path);
  const out = new URL(file, clientDir);

  await mkdir(new URL(".", out), { recursive: true });
  // Function replacers, so `$` sequences in the markup aren't treated as
  // replacement patterns.
  await writeFile(
    out,
    template
      .replace("<!--app-head-->", () => head)
      .replace("<!--app-html-->", () => html),
  );
  console.log(`prerendered ${path} -> ${file}`);
}

await writeFile(new URL("sitemap.xml", clientDir), sitemapXml());
await rm(ssrDir, { recursive: true, force: true });
