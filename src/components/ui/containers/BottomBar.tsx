'use client';

import React from 'react';
import clsx from 'clsx';

export default function BottomBar({
  children,
  className,
  alwaysSticky = false,
}: {
  children: React.ReactNode;
  className?: string;
  alwaysSticky?: boolean;
}) {
  const base =
    'px-4 pt-1 h-14 flex items-center justify-center gap-4 ' +
    'pb-[env(safe-area-inset-bottom)] ' +
    'border-t border-gray-200 bg-white';

  const sticky =
    'fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl z-30';

  const responsive = alwaysSticky ? sticky : 'lg:static lg:translate-x-0';

  return <div className={clsx(base, responsive, className)}>{children}</div>;
}
