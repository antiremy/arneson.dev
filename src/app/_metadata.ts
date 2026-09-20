import type { Metadata } from "next";

export const siteName = "Remington Arneson";
export const siteUrl = "https://arneson.dev";
export const siteDescription =
  "A software engineer specializing in web development and reverse engineering";

export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteName} — Software Engineer`,
};

// Next replaces a parent's `openGraph` object wholesale when a page defines its
// own — including the image picked up from the opengraph-image file convention
// — so the shared fields are composed here rather than repeated per page.
export function openGraph(path: string): Metadata["openGraph"] {
  return {
    type: "website",
    siteName,
    locale: "en_US",
    url: path,
    images: [ogImage],
  };
}
