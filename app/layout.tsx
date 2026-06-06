// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import MUIThemeProvider from "./MUIThemeProvider";
import ClientLayoutWrapper from "@/component/layoutWrapper/ClientLayoutWrapper";

export const metadata = {
  title: "استودیو محراب | رسانه و تولید هنری با رسالت و دغدغه",
  description:
    "امروز آثار هنری و رسانه‌ای زبان مشترک مردم جهان‌اند. ما در محراب با گردهم‌آوردن تیمی جوان و متخصص، به دنبال خلق آثار باکیفیت هنری و رسانه‌ای هستیم تا بتوانیم اندیشه‌ها و دغدغه‌های خود را با زبان هنر بیان کنیم.",
  keywords: [
    "هنر",
    "رسانه",
    "تولید محتوا",
    "استودیو محراب",
    "فیلم",
    "مستند",
    "موشن گرافیک",
    "گرافیک",
    "صدا",
  ],
  authors: [{ name: "استودیو محراب", url: "https://www.mehrabartmedia.ir" }],
  creator: "استودیو محراب",
  publisher: "استودیو محراب",

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "استودیو محراب | رسانه و تولید هنری با رسالت و دغدغه",
    description:
      "امروز آثار هنری و رسانه‌ای زبان مشترک مردم جهان‌اند. ما در محراب با گردهم‌آوردن تیمی جوان و متخصص، به دنبال خلق آثار باکیفیت هنری و رسانه‌ای هستیم تا بتوانیم اندیشه‌ها و دغدغه‌های خود را با زبان هنر بیان کنیم.",
    url: "https://mehrabfamily.ir",
    siteName: "استودیو محراب",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider>
          <MUIThemeProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </MUIThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
