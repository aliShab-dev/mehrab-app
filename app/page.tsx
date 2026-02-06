import getCategories from "@/component/adminPage/service/getCat";
import AudioSection from "@/component/audioSection/AudioSection";
import FilmDocSection from "@/component/filmDocSection/FIlmDocSection";
import { Suspense } from "react";
import MotionSection from "@/component/motionSection/MotionSection";
import { transformCategories } from "@/util/numberHandler";
import MainBanner from "@/component/mainBanner/MainBanner";
import Comunity from "@/component/comunity/Cumunity";
import GraphicDesignSection from "@/component/graphicDesignSection/GraphicDesignSection";

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
}

export default async function Home() {
  const categories = await getCategories();
  const transformedData = transformCategories(categories);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "استودیو محراب",
    url: "https://mehrabfamily.ir",
    logo: "https://mehrabfamily.ir/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+989103533906",
      contactType: "پشتیبانی",
      areaServed: "IR",
    },
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main>
        <section>
          <MainBanner />
        </section>

        <section>
          <MotionSection categories={transformedData} />
        </section>

        <section>
          <FilmDocSection categories={transformedData} />
        </section>

        <section>
          <AudioSection categories={transformedData} />
        </section>

        <section>
          <Suspense fallback={<div>درحال بارگذاری...</div>}>
            <GraphicDesignSection categories={transformedData} />
          </Suspense>
        </section>

        <section>
          <Suspense fallback={<div>درحال بارگذاری...</div>}>
            <Comunity />
          </Suspense>
        </section>

        <div style={{ height: 100 }} />
      </main>
    </div>
  );
}
