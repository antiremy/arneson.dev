"use client";

import { JSX, useEffect, useRef, useState } from "react";
import Portfolio from "./portfolio";
import Timeline from "./timeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCellsLarge,
  faTimeline,
} from "@fortawesome/free-solid-svg-icons";

type View = "cards" | "timeline";

const views = [
  { value: "cards", label: "Cards", icon: faTableCellsLarge },
  { value: "timeline", label: "Timeline", icon: faTimeline },
] as const;

export function PortfolioWrapper(): JSX.Element {
  const [view, setView] = useState<View>("cards");
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [view]);

  return (
    <>
      <div
        role="group"
        aria-label="Experience view"
        className="z-30 mt-4 flex gap-1 rounded-lg bg-slate-800/5 p-1 dark:bg-white/10"
      >
        {views.map(({ value, label, icon }) => (
          <button
            key={value}
            type="button"
            aria-pressed={view === value}
            onClick={() => setView(value)}
            data-umami-event={`${label} view`}
            className={`cursor-pointer rounded-md px-3 py-1 transition duration-300 ${
              view === value
                ? "bg-slate-800/15 dark:bg-white/25"
                : "hover:bg-slate-800/10 dark:hover:bg-white/15"
            }`}
          >
            <FontAwesomeIcon className="pr-2" icon={icon} />
            {label}
          </button>
        ))}
      </div>
      {/* The gap lives on the scroll container, not the list, so scrolled
          content clips below the toggle instead of right against it. */}
      <main
        ref={scrollRef}
        className="scrollbar z-30 mt-6 max-h-full max-w-4xl overflow-x-hidden px-2 lg:overflow-y-scroll"
      >
        {/* Keying on the view remounts the wrapper so the fade replays on each
            switch. A plain CSS animation (rather than a view transition) stays
            clipped by the scroll container. */}
        <div key={view} className="motion-safe:animate-fade-in">
          {view === "cards" ? <Portfolio /> : <Timeline />}
        </div>
      </main>
    </>
  );
}
