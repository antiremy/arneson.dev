"use client";

import { JSX, useState } from "react";
import Portfolio from "./portfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export function PortfolioWrapper(): JSX.Element {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <>
      <div className="scrollbar z-30 max-w-4xl max-h-full overflow-x-hidden lg:overflow-y-scroll px-2">
        <Portfolio seeMore={seeMore} setSeeMore={setSeeMore} />
      </div>
      <div className="w-full pt-2 text-center">
        <a
          className="invisible w-full text-center lg:visible lg:mb-6"
          onClick={() => setSeeMore(!seeMore)}
        >
          <FontAwesomeIcon
            className="text-lg"
            icon={seeMore ? faArrowUp : faArrowDown}
          />
          {seeMore ? " See Less" : " See More"}
        </a>
      </div>
    </>
  );
}
