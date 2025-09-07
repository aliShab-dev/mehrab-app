// "use client";

import MainBanner from "@/component/mainBanner/MainBanner";
import MotionSection from "@/component/motionSection/MotionSection";
import FilmDocSection from "@/component/filmDocSection/FIlmDocSection";
import AudioSection from "@/component/audioSection/AudioSection";
import GraphicDesignSection from "@/component/graphicDesignSection/GraphicDesignSection";
import Comunity from "@/component/comunity/Cumunity";

export default function Home() {
  return (
    <div>
      <main>
        <section>
          <MainBanner />
        </section>

        <section>
          <MotionSection />
        </section>

        <section>
          <FilmDocSection />
        </section>

        <section>
          <AudioSection />
        </section>

        <section>
          <GraphicDesignSection />
        </section>

        <section>
          <Comunity />
        </section>

        <div style={{ height: 100 }}></div>
      </main>
    </div>
  );
}
