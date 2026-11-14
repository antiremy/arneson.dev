import { JSX, useEffect, useRef, useState } from "react";
import Homelab from "./homelab";
import Portfolio from "./portfolio";
import Timeline from "./timeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBlog,
  faBriefcase,
  faServer,
  faTableCellsLarge,
  faTimeline,
} from "@fortawesome/free-solid-svg-icons";

type Section = "experience" | "homelab";
type View = "cards" | "timeline";

const sections = [
  { value: "experience", label: "Experience", icon: faBriefcase },
  { value: "homelab", label: "Homelab", icon: faServer },
] as const;

const views = [
  { value: "cards", label: "Cards", icon: faTableCellsLarge },
  { value: "timeline", label: "Timeline", icon: faTimeline },
] as const;

function ViewToggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (view: View) => void;
}): JSX.Element {
  return (
    <div
      role="group"
      aria-label="Experience view"
      className="z-30 mb-4 ml-auto flex w-fit gap-1 rounded-lg bg-slate-800/5 p-1 dark:bg-white/10"
    >
      {views.map(({ value, label, icon }) => (
        <button
          key={value}
          type="button"
          aria-pressed={view === value}
          aria-label={label}
          title={label}
          onClick={() => onChange(value)}
          data-umami-event={`${label} view`}
          className={`cursor-pointer rounded-md px-2.5 py-1 transition duration-300 ${
            view === value
              ? "bg-slate-800/15 dark:bg-white/25"
              : "hover:bg-slate-800/10 dark:hover:bg-white/15"
          }`}
        >
          <FontAwesomeIcon icon={icon} />
        </button>
      ))}
    </div>
  );
}

export function PortfolioWrapper(): JSX.Element {
  const [section, setSection] = useState<Section>("experience");
  const [view, setView] = useState<View>("cards");
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [section, view]);

  return (
    <>
      <div
        role="group"
        aria-label="Section"
        className="z-30 mt-4 flex gap-1 rounded-lg bg-slate-800/5 p-1 dark:bg-white/10"
      >
        {sections.map(({ value, label, icon }) => (
          <button
            key={value}
            type="button"
            aria-pressed={section === value}
            onClick={() => setSection(value)}
            data-umami-event={`${label} section`}
            className={`cursor-pointer rounded-md px-3 py-1 transition duration-300 ${
              section === value
                ? "bg-slate-800/15 dark:bg-white/25"
                : "hover:bg-slate-800/10 dark:hover:bg-white/15"
            }`}
          >
            <FontAwesomeIcon className="pr-2" icon={icon} />
            {label}
          </button>
        ))}
        <a
          href="https://blog.arneson.dev"
          target="_blank"
          rel="noreferrer"
          data-umami-event="Blog link"
          className="rounded-md px-3 py-1 transition duration-300 hover:bg-slate-800/10 dark:hover:bg-white/15"
        >
          <FontAwesomeIcon className="pr-2" icon={faBlog} />
          Blog
          <FontAwesomeIcon
            className="pl-2 text-xs"
            icon={faArrowUpRightFromSquare}
          />
        </a>
      </div>
      {/* The gap lives on the scroll container, not the list, so scrolled
          content clips below the toggle instead of right against it. */}
      <main
        ref={scrollRef}
        className="scrollbar z-30 mt-6 max-h-full max-w-4xl overflow-x-hidden px-2 lg:overflow-y-scroll"
      >
        {/* Keying on the section and view remounts the wrapper so the fade
            replays on each switch. A plain CSS animation (rather than a view
            transition) stays clipped by the scroll container. */}
        <div
          key={`${section}-${view}`}
          className="motion-safe:animate-fade-in"
        >
          {section === "homelab" ? (
            <Homelab />
          ) : (
            <>
              <ViewToggle view={view} onChange={setView} />
              {view === "cards" ? <Portfolio /> : <Timeline />}
            </>
          )}
        </div>
      </main>
    </>
  );
}
