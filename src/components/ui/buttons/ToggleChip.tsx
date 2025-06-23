"use client";

import React from "react";

export type ToggleValue<T extends readonly unknown[]> = T[number] extends {
  id: infer I extends string;
}
  ? I | null
  : T[number] | null;

function defaultGetId<Item extends string | { id: string }>(
  item: Item
): string {
  return typeof item === "string" ? item : item.id;
}

export default function ToggleChip<
  T extends readonly (
    | string
    | { id: string; label?: string; icon?: React.ReactNode }
  )[],
>({
  items,
  selected,
  onChange,
  render,

  getId = defaultGetId as (item: T[number]) => string,
}: {
  items: T;
  selected: ToggleValue<T>;
  onChange: (val: ToggleValue<T>) => void;
  render: (item: T[number], active: boolean) => React.ReactNode;
  getId?: (item: T[number]) => string;
}) {
  const setValue = (next: string | null) => onChange(next as ToggleValue<T>);

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const id = getId(item);
        const active = id === selected;

        return (
          <button
            key={id}
            onClick={() => setValue(active ? null : id)}
            className={[
              "rounded-full border px-4 py-1 text-sm transition shadow-sm",
              active
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100",
            ].join(" ")}
          >
            {render(item, active)}
          </button>
        );
      })}
    </div>
  );
}
