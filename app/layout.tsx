'use client';
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import MUIThemeProvider from "./MUIThemeProvider";
import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin');
  return (
    <html lang="fa" dir="rtl">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <ThemeProvider>
          <MUIThemeProvider >
            {!isAdminRoute && <Navbar />}
            {children}
            {!isAdminRoute && <Footer />}

          </MUIThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
