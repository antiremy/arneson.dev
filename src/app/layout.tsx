import Loading from "./loading";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";
import colors from "tailwindcss/colors";

import "./global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Remington Arneson",
  description:
    "A software engineer specializing in web development and reverse engineering",
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
      <html
        suppressHydrationWarning
        lang="en"
        className="bg-white dark:bg-gray-800"
      >
        <body className="overflow-x-hidden lg:overflow-y-hidden">
          <ThemeProvider attribute="class">
            <div id="root" className="flex flex-col items-center">
              <Suspense fallback={<Loading />}>{children}</Suspense>
              <Script
                src="https://analytics.remy.lol/script.js"
                data-website-id="371ca0ca-bed0-4b09-a25d-f14cbaed47c5"
              />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
