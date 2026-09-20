import type { MetadataRoute } from "next";

const baseUrl = "https://arneson.dev";

// Hardcoded so the sitemap reports when content actually changed, rather than
// claiming every URL changed at build time.
const homeLastModified = "2026-09-01";
const projectLastModified = "2026-06-08";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/wrath`,
      lastModified: projectLastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/monitr`,
      lastModified: projectLastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
