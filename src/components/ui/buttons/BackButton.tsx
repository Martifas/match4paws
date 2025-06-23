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
        "text-[#ed9426] hover:text-orange-300 hover:scale-110 font-bold",
        className
      )}
    >
      <ArrowBackIcon fontSize="large" />
    </button>
  );
}
