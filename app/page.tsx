import getCategories from "@/component/adminPage/service/getCat";
import AudioSection from "@/component/audioSection/AudioSection";
import FilmDocSection from "@/component/filmDocSection/FIlmDocSection";
import { Suspense } from "react";
import MotionSection from "@/component/motionSection/MotionSection";
import GraphicDesignWrapper from "@/component/graphicDesignSection/component/GraphicWrapper";
import { transformCategories } from "@/util/numberHandler";
import MainBanner from "@/component/mainBanner/MainBanner";
import Comunity from "@/component/comunity/Cumunity";

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
      contactType: "پشتیتانی",
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
            <GraphicDesignWrapper categories={transformedData} />
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
