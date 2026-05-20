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
                  paper: "#2a2f2a",
                },
              }),
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: "#2f7d32",
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                backgroundColor: "transparent",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "dark" ? "#2f3a2f" : "#ffffff",
                "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus":
                  {
                    WebkitBoxShadow: `0 0 0 100px ${mode === "dark" ? "#2f3a2f" : "#ffffff"} inset !important`,
                    WebkitTextFillColor:
                      mode === "dark" ? "#ffffff" : "#000000",
                    caretColor: mode === "dark" ? "#ffffff" : "#000000",
                  },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                ...(ownerState.variant === "outlined" && {
                  borderColor: mode === "dark" ? "#ffffff" : "#2f7d32",
                  color: mode === "dark" ? "#ffffff" : "#2f7d32",
                }),
              }),
            },
          },
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
