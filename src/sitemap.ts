import { canonicalUrl } from "./metadata";
import { projects } from "./pages/projects/projects";

// Hardcoded so the sitemap reports when content actually changed, rather than
// claiming every URL changed at build time.
const homeLastModified = "2026-09-01";
const projectLastModified = "2026-06-08";

const entries = [
  {
    path: "/",
    lastModified: homeLastModified,
    changeFrequency: "monthly",
    priority: 1,
  },
  ...Object.keys(projects).map((slug) => ({
    path: `/${slug}`,
    lastModified: projectLastModified,
    changeFrequency: "yearly",
    priority: 0.8,
  })),
];

export function sitemapXml(): string {
  const urls = entries.map(
    (entry) => `<url>
<loc>${canonicalUrl(entry.path)}</loc>
<lastmod>${entry.lastModified}</lastmod>
<changefreq>${entry.changeFrequency}</changefreq>
<priority>${entry.priority}</priority>
</url>`,
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}
