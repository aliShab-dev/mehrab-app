import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import MUIThemeProvider from "./MUIThemeProvider";
import getCategories from "@/component/adminPage/service/getCat";
import ClientLayoutWrapper from "@/component/layoutWrapper/ClientLayoutWrapper";

export async function generateMetadata() {
  const categories = await getCategories();
  const transformedCategories = categories.map((cat) => cat.name);

  return {
    title: "استودیو محراب | رسانه و تولید هنری با رسالت و دغدغه",
    description:
      "امروز آثار هنری و رسانه‌ای زبان مشترک مردم جهان‌اند. ما در محراب با گردهم‌آوردن تیمی جوان و متخصص، به دنبال خلق آثار باکیفیت هنری و رسانه‌ای هستیم تا بتوانیم اندیشه‌ها و دغدغه‌های خود را با زبان هنر بیان کنیم.",
    keywords: transformedCategories,
    authors: [{ name: "استودیو محراب", url: "https://www.mehrabartmedia.ir" }],
    creator: "استودیو محراب",
    publisher: "استودیو محراب",
  };
}

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
