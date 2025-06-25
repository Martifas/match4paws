'use client';

import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type BackButtonProps = {
  to?: string;
  hidden?: boolean;
  className?: string;
  onClick?: () => void;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>;

export default function BackButton({
  to,
  hidden,
  className,
  onClick,
  ...buttonProps
}: BackButtonProps) {
  const router = useRouter();

  if (hidden) return null;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      router.push(to);
    } else {
      router.back();
    }
  };

  return (
    <button
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
