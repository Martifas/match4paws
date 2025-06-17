"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

type ProgressBarProps = {
  value: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <Box sx={{ width: "80%" }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#f5f5f5",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#ed9426",
          },
        }}
      />
    </Box>
  );
}
