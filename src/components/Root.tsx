import { useEffect, useRef, useState } from "react";

import Footer from "./Footer.tsx";
import Header from "./Header/Header.tsx";
import Portfolio from "./Portfolio/Portfolio.tsx";

export default function Root() {
  const [darkMode, setIsDark] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const ref = useRef<HTMLDivElement>(null);
  const [isScroll, setIsScroll] = useState(false);

  function updateState() {
    console.log("updating", ref.current?.scrollHeight,  window.innerHeight, isScroll);
    if (ref.current && ref.current?.scrollHeight - 1 > window.innerHeight) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }

  useEffect(() => {
    if (ref.current) {
      updateState();
  
      window.addEventListener("resize", updateState);
  
      return () => window.removeEventListener("resize", updateState);
    }
  }, [ref.current]);

  return (
    <div
      ref={ref}
      className={`flex h-full w-full flex-col items-center justify-center ${
        darkMode ? "dark bg-gray-800 text-white" : "bg-white text-black"
      } ${isScroll ? "" : "lg:h-screen"}`}
    >
      <div className="mt-6 lg:mt-auto">
        <Header />
      </div>
      <div className="z-30 max-w-4xl">
        <Portfolio />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
