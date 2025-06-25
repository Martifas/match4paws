"use client";

import { useRef } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

type Props = { photos: { url: string }[]; alt: string; className?: string };

export default function PetCarousel({ photos, alt, className }: Props) {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const width = track.current?.clientWidth ?? 0;
    track.current?.scrollBy({
      left: dir === "prev" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`relative mx-auto w-full max-w-md md:max-w-xl ${className || ""}`}
    >
      <div
        ref={track}
        className="flex overflow-x-auto overflow-y-hidden no-scrollbar
                   scroll-smooth snap-x snap-mandatory bg-black h-full"
      >
        {photos.map(({ url }) => (
          <div
            key={url}
            className="
              relative flex-shrink-0 w-full snap-center h-full
            "
          >
            <Image
              src={url}
              alt={alt}
              fill
              sizes="100vw"
              className="object-cover"
              placeholder="empty"
            />
          </div>
        ))}
      </div>

      {photos.length > 1 && (
        <>
          <IconButton
            aria-label="prev photo"
            onClick={() => scroll("prev")}
            className="!absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 text-white"
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            aria-label="next photo"
            onClick={() => scroll("next")}
            className="!absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 text-white"
          >
            <ChevronRight />
          </IconButton>
        </>
      )}
    </div>
  );
}
