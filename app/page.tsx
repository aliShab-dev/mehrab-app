// "use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import MainBanner from "@/component/mainBanner/MainBanner";
import MotionSection from "@/component/motionSection/MotionSection";
import FilmDocSection from "@/component/filmDocSection/FIlmDocSection";
import AudioSection from "@/component/audioSection/AudioSection";
import GraphicDesignSection from "@/component/graphicDesignSection/GraphicDesignSection";
import Comunity from "@/component/comunity/Cumunity";

export default function Home() {
  // const context = useContext(ThemeContext);
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
       
          <div style={{height: 100}}></div>
      </main>
    </div>
  );
}
