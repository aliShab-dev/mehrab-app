"use client";

import dynamic from "next/dynamic";

const GraphicDesignSection = dynamic(
  () => import("../GraphicDesignSection"),
  { ssr: false }
);

export default function GraphicDesignWrapper(props: any) {
  return <GraphicDesignSection {...props} />;
}
