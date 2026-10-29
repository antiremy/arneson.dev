import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { JSX } from "react";
import { Link, useLocation } from "react-router";
import { isProjectSlug, projectHeading } from "./projects";

export function Header(): JSX.Element {
  // Derived from the route rather than pushed up from the page via context, so
  // the label is present in the prerendered HTML instead of appearing once
  // client JS has run.
  const slug = useLocation().pathname.split("/").filter(Boolean)[0] ?? "";
  const title = isProjectSlug(slug) ? projectHeading(slug) : "";

  return (
    <div className="flex-start fixed top-0 left-0 z-50 flex h-12 w-full items-center justify-start border-b-white/75 bg-white pt-2 pb-2 pl-4 text-4xl dark:bg-gray-800">
      <div className="z-50">
        <Link to="/" aria-label="Back to home">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>

      {title && (
        <h1 className="absolute left-0 z-40 w-screen text-center text-lg font-semibold">
          {title}
        </h1>
      )}
    </div>
  );
}
