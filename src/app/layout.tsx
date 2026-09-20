import Loading from "./loading";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";
import colors from "tailwindcss/colors";

import "./global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ViewTransitions } from "next-view-transitions";
import { openGraph, siteDescription, siteName, siteUrl } from "./_metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s • ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  // og/twitter title and description are intentionally omitted throughout: Next
  // fills them from each page's own title/description, so the project pages get
  // their own card text without repeating it.
  openGraph: openGraph("/"),
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: colors.white }, // Light mode color
    { media: "(prefers-color-scheme: dark)", color: colors.gray["800"] }, // Dark mode color
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className="bg-white dark:bg-gray-800">
        <body className="overflow-x-hidden lg:overflow-y-hidden">
          <div id="root" className="flex flex-col items-center">
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Script
              src="https://analytics.remy.lol/script.js"
              data-website-id="371ca0ca-bed0-4b09-a25d-f14cbaed47c5"
            />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
