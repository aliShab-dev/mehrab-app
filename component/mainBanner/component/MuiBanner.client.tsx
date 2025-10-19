"use client";

import { motion, animate, useMotionValue } from "framer-motion";
import { useState } from "react";
import { Counter, IconSwinger } from "./subs";

export default function MainBannerClient() {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  const startCounting = () => {
    count.set(0);
    animate(count, 10000, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Number(latest.toFixed(0))),
    });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        inset: 0,
        zIndex: 200,
      }}
    >
      <IconSwinger />
      <Counter startCounting={startCounting} display={display} />
    </motion.div>
  );
}
