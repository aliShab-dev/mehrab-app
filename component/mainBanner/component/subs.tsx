"use client";

import { Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { toPersianDigits } from "@/app/util/numberHandler";
import { motion } from "framer-motion";
import { Avatar, Stack, Typography } from "@mui/material";

const icons = [
  {
    src: "/k-like.png",
    bottom: "25%",
    right: "10%",
    rotate: "0",
    factor: 1,
    size: { xs: 50, sm: 100, md: 150 },
  },
  {
    src: "/k-camera.png",
    bottom: "6%",
    right: "25%",
    rotate: "0",
    factor: -0.6,
    size: { xs: 100, sm: 150, md: 205 },
  },
  {
    src: "/k-palette.png",
    bottom: "0%",
    right: "46%",
    rotate: "0",
    factor: 1,
    size: { xs: 80, sm: 120, md: 170 },
  },
  {
    src: "/k-clapboard.png",
    bottom: "10%",
    left: "25%",
    rotate: "0",
    factor: 0.4,
    size: { xs: 80, sm: 110, md: 170 },
  },
  {
    src: "/k-film-cam.png",
    bottom: "18%",
    left: "8%",
    rotate: "0",
    factor: -1,
    size: { xs: 110, sm: 150, md: 220 },
  },
];

export type MouseType = {
  x: number;
  y: number;
};

export function IconSwinger() {
  const swingAmplitude = 3;
  const moveAmplitude = 3;

  return (
    <Stack display={{ xs: "none", sm: "flex" }}>
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
              whileHover={{
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
                  width: icon.size,
                  height: icon.size,
                  transformStyle: "preserve-3d",
                  transform: `rotate(${icon.rotate})`,
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </Stack>
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
    <Stack display={{xs: 'none', sm: 'flex'}}>
      <motion.div
        style={{
          position: "absolute",
          bottom: 60,
          left: "5%",
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
        <Typography
          fontWeight={700}
          fontSize={{ xs: 16, sm: 20, md: 24 }}
          lineHeight={0.9}
        >
          {toPersianDigits(display.toString())}+
        </Typography>
        <Typography fontSize={{ xs: 12, sm: 16, md: 20 }} lineHeight={0.9}>
          دقیقه تولید ویدیوئی
        </Typography>
      </motion.div>
    </Stack>
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
