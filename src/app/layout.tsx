import Loading from "./Loading";
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Remington Arneson",
  description: "Personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lg:h-full bg-white dark:bg-gray-800">
      <body className="overflow-x-hidden lg:h-full lg:overflow-y-hidden bg-white dark:bg-gray-800">
        <div id="root" className="bg-white dark:bg-gray-800">
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Script src="https://analytics.remy.lol/script.js" data-website-id="371ca0ca-bed0-4b09-a25d-f14cbaed47c5"/>
        </div>
      </body>
    </html>
  );
}
