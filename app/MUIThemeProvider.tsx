import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { use } from "react";
import { ThemeContext } from "./ThemeContext";
import createCache from "@emotion/cache";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { faIR } from "@mui/material/locale";
import { faIR as DateFaIR } from "@mui/x-date-pickers/locales";
import { faIR as DataTableFa } from "@mui/x-data-grid/locales";

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

function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}

const cache = createEmotionCache();

export const getCustomTheme = (palette: string) => {
  switch (palette) {
    case "light-green":
      return createTheme(
        {
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
        },
        faIR,
        DateFaIR,
        DataTableFa
      );
    case "green":
      return createTheme(
        {
          ...baseTheme,
          palette: {
            mode: "light",
            primary: { main: "#3AEDA2" },
            secondary: { main: "#4EBFA8" },
            svgColor: { main: "#91e6c2" },
            navbarColor: { main: "#C8F0E5" },
            background: {
              ...baseTheme?.palette?.background,
              default: "#F8F9FF",
              paper: "#F8F9FF",
            },
          },
        },
        faIR,
        DateFaIR,
        DataTableFa
      );
    case "blue":
      return createTheme(
        {
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
        },
        faIR,
        DateFaIR,
        DataTableFa
      );
    default:
      return createTheme(
        {
          ...baseTheme,
          palette: {
            mode: "light",
          },
        },
        faIR,
        DateFaIR,
        DataTableFa
      );
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
    <AppRouterCacheProvider options={{ key: "css" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
