"use client";

import dynamic from "next/dynamic";

const MainBanner = dynamic(() => import("../MainBanner"), { ssr: false });

export default function MainBannerWrapper() {
  return <MainBanner />;
}