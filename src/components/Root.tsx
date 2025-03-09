import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer.tsx";
import Header from "./Header/Header.tsx";
import Portfolio from "./Portfolio/Portfolio.tsx";

export default function Root() {
  const [darkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [seeMore, setSeeMore] = useState(false);
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
      <div className="z-30 scrollbar max-h-full max-w-4xl lg:overflow-y-auto overflow-x-hidden">
        <Portfolio seeMore={seeMore} setSeeMore={setSeeMore} />
      </div>
      <div className="w-full pt-2 text-center">
        <a
          className="invisible w-full text-center lg:visible lg:mb-6"
          onClick={() => setSeeMore(!seeMore)}
        >
          <FontAwesomeIcon
            className="text-l"
            icon={seeMore ? faArrowUp : faArrowDown}
          />
          {seeMore ? " See Less" : " See More"}
        </a>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
