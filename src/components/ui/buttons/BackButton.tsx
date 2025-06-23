"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

type BackButtonProps = {
  hidden?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

export default function BackButton({
  hidden,
  className,
  ...buttonProps
}: BackButtonProps) {
  if (hidden) return null;

  return (
    <button
      {...buttonProps}
      className={clsx(
        "absolute left-4 top-1/2 -translate-y-1/2 text-[#ed9426] " +
          "hover:text-orange-300 hover:scale-110 font-bold z-10",
        className
      )}
    >
      <ArrowBackIcon fontSize="large" />
    </button>
  );
}
