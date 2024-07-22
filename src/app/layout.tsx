import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import Loading from "./Loading";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Remington Arneson",
  description: "Personal website",
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-w-screen min-h-screen overflow-x-hidden md:h-screen">
        <div id="root">
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Script src="https://analytics.remy.lol/script.js" data-website-id="371ca0ca-bed0-4b09-a25d-f14cbaed47c5"/>
        </div>
      </body>
    </html>
  );
}
