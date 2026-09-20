"use client";

import { JSX, useState } from "react";
import Portfolio from "./portfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export function PortfolioWrapper(): JSX.Element {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <>
      <main className="scrollbar z-30 max-h-full max-w-4xl overflow-x-hidden px-2 lg:overflow-y-scroll">
        <Portfolio seeMore={seeMore} />
      </main>
      <div className="w-full text-center lg:pt-2">
        <button
          type="button"
          // Only the desktop layout collapses the list, so the toggle stays out
          // of the tab order and accessibility tree on mobile.
          className="hidden w-full cursor-pointer text-center lg:mb-6 lg:block"
          aria-expanded={seeMore}
          aria-controls="portfolio-list"
          onClick={() => setSeeMore(!seeMore)}
          data-umami-event={seeMore ? "See less" : "See more"}
        >
          <FontAwesomeIcon
            className="text-lg"
            icon={seeMore ? faArrowUp : faArrowDown}
          />
          {seeMore ? " See Less" : " See More"}
        </button>
      </div>
    </>
  );
}
