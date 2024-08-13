import { useState } from "react";
import Image, { StaticImageData } from "next/image";

export default function ClickableImage(props: {
  src: StaticImageData;
  alt: string;
}) {
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <>
      <div onClick={() => setShowOriginal(true)} className="relative z-0">
        <Image
          src={props.src}
          className="h-auto max-h-96 w-auto max-w-96 rounded-md drop-shadow-none transition hover:cursor-pointer hover:drop-shadow-glow"
          alt={props.alt + " thumbnail"}
        />
      </div>
      {showOriginal && (
        <div
          className="fixed left-0 top-0 z-40 flex h-full w-screen items-center justify-center overflow-hidden bg-black/65"
          onClick={() => setShowOriginal(false)}
        >
          <Image
            src={props.src}
            className="max-h-screen w-auto py-2"
            alt={props.alt}
            objectFit="contain"
          />
        </div>
      )}
    </>
  );
}
