'use client';

import React from 'react';

export type MultiToggleValue = string[];

function defaultGetId<Item extends string | { id: string }>(item: Item) {
  return typeof item === 'string' ? item : item.id;
}

export default function MultiToggleChip<
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
  selected: MultiToggleValue;
  onChange: (val: MultiToggleValue) => void;
  render: (item: T[number], active: boolean) => React.ReactNode;
  getId?: (item: T[number]) => string;
}) {
  const toggle = (id: string) => {
    const exists = selected.includes(id);
    onChange(exists ? selected.filter(i => i !== id) : [...selected, id]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => {
        const id = getId(item);
        const active = selected.includes(id);

        return (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={[
              'rounded-full border px-4 py-1 text-sm transition shadow-sm',
              active
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100',
            ].join(' ')}
          >
            {render(item, active)}
          </button>
        );
      })}
    </div>
  );
}
