import getCategories from "@/component/adminPage/service/getCat";
import AudioSection from "@/component/audioSection/AudioSection";
import FilmDocSection from "@/component/filmDocSection/FIlmDocSection";
import { Suspense } from "react";
import MotionSection from "@/component/motionSection/MotionSection";
import MainBannerWrapper from "@/component/mainBanner/component/BannerWrapper";
import GraphicDesignWrapper from "@/component/graphicDesignSection/component/GraphicWrapper";
import CommunityWrapper from "@/component/comunity/component/CummunityWrapper";
import { transformCategories } from "@/util/numberHandler";
import MainBanner from "@/component/mainBanner/MainBanner";

export default async function Home() {
  const categories = await getCategories();
  const transformedData = transformCategories(categories);

  return (
    <div>
      <main>
        <section>
          <Suspense fallback={<div>درحال بارگذاری...</div>}>
            <MainBanner />
          </Suspense>
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
            <CommunityWrapper />
          </Suspense>
        </section>

        <div style={{ height: 100 }} />
      </main>
    </div>
  );
}