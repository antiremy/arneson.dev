"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

export default function ClickableImage(props: {
  src: StaticImageData;
  alt: string;
}) {
  const [showOriginal, setShowOriginal] = useState(false);

  useEffect(() => {
    if (!showOriginal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowOriginal(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showOriginal]);

  return (
    <>
      <button
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
          role="dialog"
          aria-modal="true"
          aria-label={props.alt}
          className="fixed top-0 left-0 z-40 flex h-full w-screen items-center justify-center overflow-hidden bg-black/65"
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
