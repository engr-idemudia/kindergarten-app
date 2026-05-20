"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeModeProvider, useThemeMode } from "@/src/context/ThemeContext";

function MUIThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeMode();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#2f7d32",
          },
          secondary: {
            main: "#ff8f00",
          },
          ...(mode === "light"
            ? {
                background: {
                  default: "#f6fbf6",
                  paper: "#ffffff",
                },
              }
            : {
                background: {
                  default: "#1a1f1a",
                  paper: "#242b24",
                },
              }),
        },
      }),
    [mode],
  );

  const [cache] = React.useState(() =>
    createCache({ key: "mui", prepend: true }),
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeModeProvider>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </ThemeModeProvider>
  );
}
