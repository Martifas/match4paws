"use client";

import { useRef } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

type Props = { photos: { url: string }[]; alt: string };

export default function PetCarousel({ photos, alt }: Props) {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const width = track.current?.clientWidth ?? 0;
    track.current?.scrollBy({
      left: dir === "prev" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mx-auto max-w-md md:max-w-xl">
      <div
        ref={track}
        className="flex overflow-x-auto rounded-md overflow-y-hidden no-scrollbar scroll-smooth snap-x snap-mandatory bg-black"
        style={{ height: 320 }}
      >
        {photos.map(({ url }) => (
          <Image
            key={url}
            src={url}
            alt={alt}
            width={800}
            height={600}
            placeholder="empty"
            className="w-full flex-shrink-0 object-cover"
            style={{ height: 320, scrollSnapAlign: "center" }}
          />
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
