"use client";

import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

type SearchButtonProps = {
  to?: string;
  hidden?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick">;

export default function SearchButton({
  to = "/search",
  hidden,
  className,
  ...buttonProps
}: SearchButtonProps) {
  const router = useRouter();
  if (hidden) return null;

  return (
    <button
      type="button"
      onClick={() => router.push(to)}
      className={clsx(
        "flex items-center justify-center w-9 h-9 rounded-full border border-gray-300",
        "hover:bg-gray-50 active:bg-gray-100",
        className
      )}
      {...buttonProps}
    >
      <SearchIcon fontSize="small" />
    </button>
  );
}
