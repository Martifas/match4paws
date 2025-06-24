"use client";

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

type BackButtonProps = {
  to?: string;
  hidden?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick">;

export default function BackButton({
  to,
  hidden,
  className,
  ...buttonProps
}: BackButtonProps) {
  const router = useRouter();

  if (hidden) return null;

  return (
    <button
      type="button"
      onClick={() => (to ? router.push(to) : router.back())}
      className={clsx(
        "text-[#ed9426] hover:text-orange-300 hover:scale-110 font-bold",
        className
      )}
      {...buttonProps}
    >
      <ArrowBackIcon fontSize="large" />
    </button>
  );
}
