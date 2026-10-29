import { renderToStaticMarkup, renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { Head } from "./head";
import { siteUrl, type PageMeta } from "./metadata";
import { projects } from "./pages/projects/projects";
import { notFoundMeta, routes } from "./routes";

export { sitemapXml } from "./sitemap";

// Build-time only: scripts/prerender.mjs renders each of these into its own
// HTML file, which the runtime server then serves as-is.
export const pages = [
  { path: "/", file: "index.html" },
  ...Object.keys(projects).map((slug) => ({
    path: `/${slug}`,
    file: `${slug}/index.html`,
  })),
  { path: notFoundMeta.path, file: "404.html" },
];

const { query, dataRoutes } = createStaticHandler(routes);

export async function render(path: string) {
  const context = await query(new Request(new URL(path, siteUrl)));
  if (context instanceof Response) {
    throw new Error(`Prerendering ${path} returned a ${context.status}`);
  }

  const router = createStaticRouter(dataRoutes, context);
  const meta = context.matches.at(-1)!.route.handle as PageMeta;

  return {
    head: renderToStaticMarkup(<Head meta={meta} />),
    html: renderToString(
      <StaticRouterProvider router={router} context={context} />,
    ),
  };
}
