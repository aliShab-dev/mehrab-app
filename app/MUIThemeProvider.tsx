"use client";
import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { use } from "react";
import { ThemeContext } from "./ThemeContext";

declare module "@mui/material/styles" {
  interface Palette {
    navbarColor: Palette["primary"];
    svgColor: Palette["primary"];
  }

  interface PaletteOptions {
    navbarColor?: PaletteOptions["primary"];
    svgColor?: PaletteOptions["primary"];
  }
}

type BaseTheme = {
  direction: "ltr" | "rtl";
  typography: {
    fontFamily: string;
  };
} & ThemeOptions;

const baseTheme: BaseTheme = {
  direction: "rtl",
  typography: {
    fontFamily: "Dirooz, Roboto, Arial, sans-serif",
  },
};

export const getCustomTheme = (palette: string) => {
  switch (palette) {
    case "light-green":
      return createTheme({
        ...baseTheme,
        palette: {
          mode: "light",
          primary: { main: "#37E3C3" },
          secondary: { main: "#4EBFA8" },
          svgColor: { main: "#19CEAA" },
          navbarColor: { main: "#19CEAA" },
          background: {
            ...baseTheme?.palette?.background,
            default: "#F8F9FF",
            paper: "#F8F9FF",
          },
        },
      });
    case "green":
      return createTheme({
        ...baseTheme,
        palette: {
          mode: "light",
          primary: { main: "#3AEDA2" },
          secondary: { main: "#4EBFA8" },
          svgColor: { main: "#CBCCE4" },
          navbarColor: { main: "#C8F0E5" },
          background: {
            ...baseTheme?.palette?.background,
            default: "#F8F9FF",
            paper: "#F8F9FF",
          },
        },
      });
    case "blue":
      return createTheme({
        ...baseTheme,
        palette: {
          mode: "light",
          primary: { main: "#00B4D8" },
          secondary: { main: "#0263A3" },
          svgColor: { main: "#90E0EF" },
          navbarColor: { main: "#2DC0DF" },
          background: {
            ...baseTheme?.palette?.background,
            default: "#F8F9FF",
            paper: "#F8F9FF",
          },
        },
      });
    default:
      return createTheme({
        ...baseTheme,
        palette: {
          mode: "light",
        },
      });
  }
};

export default function MUIThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = use(ThemeContext)!;

  const theme = getCustomTheme(context.palette);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
