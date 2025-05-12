"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import Navbar from "@/component/navbar/Navbar";
import MainBanner from "@/component/mainBanner/MainBanner";
import MotionSection from "@/component/motionSection/MotionSection";
import FilmDocSection from "@/component/filmDocSection/FIlmDocSection";

export default function Home() {
  const context = useContext(ThemeContext);
  return (
    <div>
      <Navbar />
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
          {/* <AudioSection /> */}
        </section>
          <div style={{height: 100}}></div>
       
      </main>
      {/* <footer>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
