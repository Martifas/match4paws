'use client';

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ed9426",
      contrastText: "#fff",
    },
  },
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "rgba(0,0,0,0.6)",
          "&.Mui-selected": { color: "#ed9426" },
        },
      },
    },
    MuiTouchRipple: {
      styleOverrides: {
        child: { backgroundColor: "#ed9426" },
      },
    },
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
