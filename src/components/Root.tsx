import { useEffect, useRef, useState } from "react";

import Footer from "./Footer.tsx";
import Header from "./Header/Header.tsx";
import Portfolio from "./Portfolio/Portfolio.tsx";

export default function Root() {
  const [darkMode, setIsDark] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [seeMore, setSeeMore] = useState(false)
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={ref}
      className={`flex h-full w-full flex-col items-center justify-center ${
        darkMode ? "dark bg-gray-800 text-white" : "bg-white text-black"
      } ${seeMore ? "" : "lg:h-screen"}`}
    >
      <div className="mt-6 lg:mt-auto">
        <Header />
      </div>
      <div className="z-30 max-w-4xl">
        <Portfolio seeMore={seeMore} setSeeMore={setSeeMore}/>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
