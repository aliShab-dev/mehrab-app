'use client';
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import MUIThemeProvider from "./MUIThemeProvider";

interface CustomMetadata extends Metadata {
  title: string;
  description: string;
}

const metadata: CustomMetadata = {
  title: "گروه هنری محراب",
  description: "گروه هنری محراب با هدف ارتقای فرهنگ و هنر ایرانی، در زمینه‌های طراحی، عکاسی، نقاشی، و تولید محتوای هنری فعالیت می‌کند.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <ThemeProvider>
          <MUIThemeProvider >
            {children}
          </MUIThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
