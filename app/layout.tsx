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
  openGraph: {
    title: "استودیو محراب | رسانه و تولید هنری با رسالت و دغدغه",
    description:
      "امروز آثار هنری و رسانه‌ای زبان مشترک مردم جهان‌اند. ما در محراب با گردهم‌آوردن تیمی جوان و متخصص، به دنبال خلق آثار باکیفیت هنری و رسانه‌ای هستیم تا بتوانیم اندیشه‌ها و دغدغه‌های خود را با زبان هنر بیان کنیم.",
    url: "https://mehrabfamily.ir",
    siteName: "استودیو محراب",
    locale: "fa_IR",
    type: "website",
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
