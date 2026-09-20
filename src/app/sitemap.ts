import type { MetadataRoute } from "next";
import { siteUrl } from "./_metadata";
import { projects } from "./(portfolio)/_projects";

// Hardcoded so the sitemap reports when content actually changed, rather than
// claiming every URL changed at build time.
const homeLastModified = "2026-09-01";
const projectLastModified = "2026-06-08";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...Object.keys(projects).map(
      (slug): MetadataRoute.Sitemap[number] => ({
        url: `${siteUrl}/${slug}`,
        lastModified: projectLastModified,
        changeFrequency: "yearly",
        priority: 0.8,
      }),
    ),
  ];
}
