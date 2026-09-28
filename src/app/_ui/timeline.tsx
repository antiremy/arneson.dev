import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "next-view-transitions";
import { experiences } from "./experience.tsx";

export default function Timeline() {
  return (
    <ol
      id="timeline-list"
      // Matches the two-column card grid's width so toggling doesn't shift the page.
      className="z-30 mx-auto w-full max-w-96 border-l border-slate-800/20 lg:w-[49.5rem] lg:max-w-none dark:border-white/25"
    >
      {experiences.map((experience) => (
        <li key={experience.title} className="relative pb-8 pl-6 last:pb-0">
          {/* Centered on the 1px rail: half the dot's width plus half the border. */}
          <span className="absolute top-2 -left-[6.5px] h-3 w-3 rounded-full bg-slate-800 dark:bg-white" />
          <Link
            href={experience.link}
            className="text-xl font-semibold hover:underline"
            data-umami-event={`${experience.title} timeline`}
          >
            {experience.title}
            <FontAwesomeIcon className="pl-2 text-base" icon={faArrowRight} />
          </Link>
          <div className="text-sm opacity-70">{experience.dates}</div>
          <ol className="mt-3 flex flex-col gap-3">
            {experience.roles.map((role) => (
              <li
                key={role.title}
                className="rounded-lg bg-slate-800/5 px-4 py-3 dark:bg-white/10"
              >
                <div className="text-lg font-bold">{role.title}</div>
                <div>{role.dates}</div>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
