import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface SectionProps {
  title: string;
  subtitle: string;
  position: string;
  dates: string;
  externalLink: string | undefined;
  internalLink: string | undefined;
  data: JSX.Element | string | undefined;
}

const mountedStyle = { animation: "inAnimation 200ms ease-in" };
const unmountedStyle = {
  animation: "outAnimation 220ms ease-out",
  animationFillMode: "forwards",
};

export default function Section(props: SectionProps) {
  const pathname = usePathname();
  const link = `/${props.internalLink}`;

  const [isMounted, setIsMounted] = useState(pathname === link);
  const [showModal, setShowModal] = useState(pathname === link);

  const noAnimation = useRef(true);

  useEffect(() => {
    if (noAnimation.current) {
      noAnimation.current = false;
      return;
    }
  });

  useEffect(() => {
    function popstateEventListener() {
      const pathname = window.location.pathname;
      noAnimation.current = true;
      if (pathname === link) {
        setIsMounted(true);
        setShowModal(true);
      } else {
        setIsMounted(false);
        setShowModal(false);
      }
    }
    if (props.internalLink) {
      window.addEventListener("popstate", popstateEventListener);
    }
    return () => window.removeEventListener("popstate", popstateEventListener);
  }, []);

  return (
    <>
      <div
        className="flex h-52 w-96 flex-col rounded-lg bg-slate-800/5 p-5 transition duration-300 hover:cursor-pointer hover:bg-slate-800/15 dark:bg-white/10 dark:hover:bg-white/25"
        onClick={() => {
          if (props.externalLink) open(props.externalLink);
          else {
            if (props.internalLink) {
              history.pushState(
                { page: props.internalLink },
                "",
                props.internalLink,
              );
            }
            setIsMounted(true);
            setShowModal(true);
          }
        }}
        data-umami-event={`${props.title} card`}
      >
        <div className="text-xl font-semibold">{props.title} </div>
        <div className="pt-0.5 text-2xl font-bold">
          {props.position}
          <FontAwesomeIcon className="pl-2 text-xl" icon={faArrowRight} />
        </div>
        <div className="pt-0.5 text-lg">{props.dates}</div>
        <div className="pt-4 text-xl">{props.subtitle}</div>
      </div>
      {showModal && (
        <div
          className="fixed left-0 top-0 flex h-full w-screen justify-center overflow-x-hidden bg-white py-6 dark:bg-gray-800"
          style={
            isMounted
              ? noAnimation.current
                ? { visibility: "visible" }
                : mountedStyle
              : noAnimation.current
                ? { visibility: "hidden" }
                : unmountedStyle
          }
          onAnimationEnd={() => {
            if (!isMounted) {
              setShowModal(false);
            }
          }}
        >
          <div className="flex-start fixed left-0 top-0 flex h-12 w-full bg-white pb-2 pl-4 pt-2 text-4xl dark:bg-gray-800 lg:pt-4 lg:dark:bg-transparent">
            <div
              onClick={() => {
                history.pushState({ page: "home" }, "", "/");
                setIsMounted(false);
              }}
              className="hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
          </div>
          <div className="mt-6 max-w-2xl pb-6">{props.data}</div>
        </div>
      )}
    </>
  );
}
