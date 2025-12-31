"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next-view-transitions";
import { JSX } from "react";
import { usePageData } from "../../../context/pageDataContext";

export function Header(): JSX.Element {
  const { title } = usePageData();

  return (
    <div className="flex-start fixed top-0 left-0 z-50 flex h-12 w-full items-center justify-start bg-white pt-2 pb-2 pl-4 text-4xl dark:bg-gray-800 border-b-white/75">
      <div className="z-50">
        <Link href="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>

      <div className="absolute left-0 text-lg font-semibold w-screen text-center z-40">{title}</div>
    </div>
  );
}
