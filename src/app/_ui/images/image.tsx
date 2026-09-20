"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

export default function ClickableImage(props: {
  src: StaticImageData;
  alt: string;
}) {
  const [showOriginal, setShowOriginal] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showOriginal) return;

    // Only the dialog itself is focusable, so keep focus trapped there for
    // the duration of the modal rather than letting Tab escape to the page
    // underneath.
    const trigger = triggerRef.current;
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowOriginal(false);
      if (e.key === "Tab") e.preventDefault();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [showOriginal]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setShowOriginal(true)}
        className="relative z-0 cursor-pointer"
        aria-label={`Enlarge ${props.alt}`}
      >
        <Image
          src={props.src}
          className="hover:drop-shadow-glow h-auto max-h-96 w-auto max-w-96 rounded-md drop-shadow-none transition"
          alt={props.alt + " thumbnail"}
        />
      </button>
      {showOriginal && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={props.alt}
          tabIndex={-1}
          className="fixed top-0 left-0 z-40 flex h-full w-screen items-center justify-center overflow-hidden bg-black/65 outline-none"
          onClick={() => setShowOriginal(false)}
        >
          <Image
            src={props.src}
            className="max-h-screen w-auto object-contain py-2"
            alt={props.alt}
          />
        </div>
      )}
    </>
  );
}
