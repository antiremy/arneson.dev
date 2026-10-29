export const siteName = "Remington Arneson";
export const siteUrl = "https://arneson.dev";
export const siteDescription =
  "A software engineer specializing in web development and reverse engineering";

export const ogImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: `${siteName} — Software Engineer`,
};

// Attached to each route as its `handle`. The prerender step turns it into the
// page's <head> tags, and the root route keeps document.title in sync on
// client-side navigations.
export interface PageMeta {
  // Omitted on the home page, which uses the bare site name.
  title?: string;
  description: string;
  path: string;
  noindex?: boolean;
}

export function pageTitle(meta: PageMeta): string {
  return meta.title ? `${meta.title} • ${siteName}` : siteName;
}

export function canonicalUrl(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}
