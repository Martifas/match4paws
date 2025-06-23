"use client";

import React from "react";

export default function Header({
  left,
  center,
  right,
  children,
}: {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="w-full max-w-xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
      {children ? (
        children
      ) : (
        <>
          <div className="flex-shrink-0">{left}</div>
          <div className="flex-1 text-center overflow-hidden">{center}</div>
          <div className="flex-shrink-0">{right}</div>
        </>
      )}
    </header>
  );
}
