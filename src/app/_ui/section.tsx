import { useEffect, useRef, useState, type JSX } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "next-view-transitions";

interface SectionProps {
  title: string;
  subtitle: JSX.Element;
  position: string;
  dates: string;
  link: string;
}

export default function Section({
  title,
  subtitle,
  position,
  dates,
  link,
}: SectionProps) {
  const noAnimation = useRef(true);

  useEffect(() => {
    if (noAnimation.current) {
      noAnimation.current = false;
      return;
    }
  });

  return (
    <Link href={link}> 
      <div
        className="flex h-52 w-full max-w-96 flex-col rounded-lg bg-slate-800/5 p-5 transition duration-300 hover:cursor-pointer hover:bg-slate-800/15 dark:bg-white/10 dark:hover:bg-white/25"
        data-umami-event={`${title} card`}
      >
        <div className="text-xl font-semibold">{title} </div>
        <div className="pt-0.5 text-2xl font-bold">
          {position}
          <FontAwesomeIcon className="pl-2 text-xl" icon={faArrowRight} />
        </div>
        <div className="pt-0.5 text-lg">{dates}</div>
        <div className="pt-4">{subtitle}</div>
      </div>
    </Link>
  );
}
