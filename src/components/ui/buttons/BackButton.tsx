'use client';

import { useRouter, usePathname } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type BackButtonProps = {
  to?: string;
  hidden?: boolean;
  className?: string;
  onClick?: () => void;
  smartNavigation?: boolean;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>;

export default function BackButton({
  to,
  hidden,
  className,
  onClick,
  smartNavigation = false,
  ...buttonProps
}: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (hidden) return null;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      router.push(to);
    } else if (smartNavigation) {
      const referrer = document.referrer;

      if (referrer.includes('/favorites') || pathname.startsWith('/pet/')) {
        router.push('/favorites?refresh=' + Date.now());
      } else {
        router.back();
      }
    } else {
      router.back();
    }
  };

  return (
    <button
      aria-label="Back button"
      type="button"
      onClick={handleClick}
      className={clsx(
        'text-[#ed9426] hover:text-orange-300 hover:scale-110 font-bold',
        className
      )}
      {...buttonProps}
    >
      <ArrowBackIcon fontSize="large" />
    </button>
  );
}
