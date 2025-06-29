'use client';

import { Box, Pagination } from '@mui/material';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: 'small' | 'medium' | 'large';
  shape?: 'circular' | 'rounded';
  className?: string;
  showIfSinglePage?: boolean;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  size = 'medium',
  shape = 'rounded',
  className = '',
  showIfSinglePage = false,
}: PaginationControlsProps) {
  if (totalPages <= 1 && !showIfSinglePage) {
    return null;
  }

  return (
    <Box className={`flex justify-center ${className}`}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        shape={shape}
        size={size}
      />
    </Box>
  );
}
