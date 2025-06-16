'use client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type ProgressBarProps = {
  value: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <Box sx={{ width: '80%' }}>
      <LinearProgress variant="determinate" value={value} />
    </Box>
  );
}
