import { useState } from "react";

import Footer from "./Footer.tsx";
import Header from "./Header/Header.tsx";
import Portfolio from "./Portfolio/Portfolio.tsx";

export default function Root() {
  const [darkMode, setIsDark] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center ${
        darkMode ? "dark bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="mt-6 md:mt-auto">
        <Header />
      </div>
      <div className="max-w-4xl z-30">
        <Portfolio />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
