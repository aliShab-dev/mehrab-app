'use client';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { use } from "react";
import { ThemeContext } from "./ThemeContext";

export const getCustomTheme = (palette: string) => {
    switch (palette) {
      case 'light-green':
        return createTheme({
          palette: {
            mode: 'light',
            primary: { main: '#8BC34A' },
            secondary: { main: '#AED581' },
          },
        });
      case 'green':
        return createTheme({
          palette: {
            mode: 'light',
            primary: { main: '#4CAF50' },
            secondary: { main: '#81C784' },
          },
        });
      case 'blue':
        return createTheme({
          palette: {
            mode: 'light',
            primary: { main: '#2196F3' },
            secondary: { main: '#64B5F6' },
          },
        });
      default:
        return createTheme({
          palette: {
            mode: 'light',
          },
        });
    }
  };


export default function MUIThemeProvider({ children }: { children: React.ReactNode }) {
  const context = use(ThemeContext)!;

  const theme = getCustomTheme(context.palette);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}