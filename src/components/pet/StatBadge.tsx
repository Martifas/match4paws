"use client";

import clsx from "clsx";

type Props = {
  label: string;
  value: string;
  color?: "red" | "blue" | "green" | "orange";
  className?: string;
};

export default function StatBadge({
  label,
  value,
  color = "red",
  className,
}: Props) {
  const bg = {
    red: "bg-red-100",
    blue: "bg-blue-100",
    green: "bg-green-100",
    orange: "bg-orange-100",
  }[color];

  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center rounded-md h-18 text-center flex-1",
        bg,
        className
      )}
    >
      <span className="text-gray-500">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
