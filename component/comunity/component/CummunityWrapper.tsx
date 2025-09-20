"use client";

import dynamic from "next/dynamic";

const Comunity = dynamic(() => import("../Cumunity"), { ssr: false });

export default function ComunityWrapper() {
  return <Comunity />;
}
