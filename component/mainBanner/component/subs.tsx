"use client";

import { Suspense, useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { toPersianDigits } from "@/app/util/numberHandler";
import { animate, motion, useMotionValue } from "framer-motion";
import { Avatar, Typography } from "@mui/material";

const icons = [
  { src: "/like.png", bottom: "40%", right: "8%", rotate: "30deg", factor: 1 },
  {
    src: "/camera.png",
    bottom: "20%",
    right: "25%",
    rotate: "10deg",
    factor: -0.6,
  },
  {
    src: "/palette.png",
    bottom: "5%",
    right: "46%",
    rotate: "-20deg",
    factor: 1,
  },
  {
    src: "/clapboard.png",
    bottom: "20%",
    left: "25%",
    rotate: "15deg",
    factor: 0.4,
  },
  {
    src: "/video-camera.png",
    bottom: "40%",
    left: "10%",
    rotate: "-10deg",
    factor: -1,
  },
];

export type MouseType = {
  x: number;
  y: number;
};

export function IconSwinger() {
  const swingAmplitude = 5;
  const moveAmplitude = 5;

  return (
    <>
      {icons.map((icon, index) => {
        const baseRotate = parseFloat(icon.rotate);

        const currentSwing = swingAmplitude;
        const currentMove = moveAmplitude;

        return (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
            style={{
              position: "absolute",
              bottom: icon.bottom,
              right: icon.right,
              left: icon.left,
              zIndex: 400,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{
                rotate: [
                  baseRotate - currentSwing * icon.factor,
                  baseRotate + currentSwing * icon.factor,
                  baseRotate - currentSwing * icon.factor,
                ],
                x: [
                  -currentMove * icon.factor,
                  currentMove * icon.factor,
                  -currentMove * icon.factor,
                ],
                y: [
                  currentMove * icon.factor,
                  -currentMove * icon.factor,
                  currentMove * icon.factor,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <Avatar
                src={icon.src}
                alt="Icon"
                variant="square"
                sx={{
                  width: 100,
                  height: 100,
                  transformStyle: "preserve-3d",
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

export function Counter({
  startCounting,
  display,
}: {
  startCounting: () => void;
  display: number;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: 40,
        left: "10%",
        background: "#FFCE5C",
        padding: "10px 20px",
        borderRadius: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 0,
        zIndex: 100,
        boxShadow: "0px 4px 12px rgba(0, 0, 15, 0.4)",
        cursor: "pointer",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      initial={false}
      onViewportEnter={startCounting}
      viewport={{ once: false, amount: 0.3 }} // Triggers when 30% is visible
    >
      <Typography fontWeight={700} fontSize={24} lineHeight={0.9}>
        {toPersianDigits(display.toString())}+
      </Typography>
      <Typography fontSize={20} lineHeight={0.9}>
        دقیقه تولید ویدیوئی
      </Typography>
    </motion.div>
  );
}

export const ModelCanvas = ({ mouse }: { mouse: MouseType }) => (
  <Canvas
    camera={{ position: [0, 0, 3] }}
    style={{
      position: "absolute",
      top: 50,
      zIndex: 200,
      height: "100%",
      opacity: 0.6,
    }}
  >
    <ambientLight intensity={10} />
    <directionalLight position={[5, 5, 5]} intensity={1.5} />
    <Suspense fallback={null}>
      <Model mouse={mouse} />
    </Suspense>
  </Canvas>
);

export function Model({ mouse }: { mouse: MouseType }) {
  const ref = useRef<any>(null);
  const { scene } = useGLTF("/video_camera.glb");

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = mouse.x * Math.PI;
      ref.current.rotation.x = mouse.y * Math.PI;
    }
  });

  return <primitive ref={ref} object={scene} scale={0.5} />;
}
