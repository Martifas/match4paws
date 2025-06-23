"use client";

import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

type PrimaryButtonProps = {
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<"button">;

export default function PrimaryButton({
  fullWidth = true,
  className,
  ...buttonProps
}: PrimaryButtonProps) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        "bg-[#ed9426] text-white font-bold rounded-full px-4 py-3",
        "hover:bg-orange-400 hover:scale-[1.02] active:bg-orange-500",
        "transition-transform disabled:opacity-50 disabled:pointer-events-none",
        fullWidth && "w-full max-w-md mx-auto",
        className
      )}
    />
  );
}
