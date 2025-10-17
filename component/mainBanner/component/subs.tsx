"use client";

import { motion } from "framer-motion";
import { Avatar, Stack, Typography } from "@mui/material";
import { toPersianDigits } from "@/util/numberHandler";

const icons = [
  {
    src: "/k-like.png",
    bottom: "22%",
    right: "2%",
    rotate: "0",
    factor: 1,
    size: { xs: 50, sm: 100, md: 150, lg: 180, xl: 190},
  },
  {
    src: "/k-camera.png",
    bottom: "2%",
    right: "18%",
    rotate: "0",
    factor: -0.6,
    size: { xs: 100, sm: 150, md: 205, lg: 225, xl: 240 },
  },
  {
    src: "/k-palette.png",
    bottom: "-5%",
    right: "42%",
    rotate: "0",
    factor: 1,
    size: { xs: 80, sm: 120, md: 170, lg: 190 },
  },
  {
    src: "/k-clapboard.png",
    bottom: "7%",
    left: "22%",
    rotate: "0",
    factor: 0.4,
    size: { xs: 80, sm: 110, md: 170, lg: 190, xl: 200 },
  },
  {
    src: "/k-film-cam.png",
    bottom: "16%",
    left: "-0%",
    rotate: "0",
    factor: -1,
    size: { xs: 110, sm: 150, md: 220, lg: 240, xl: 250 },
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
          bottom: '8%',
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
          fontSize={{ xs: 16, sm: 18, md: 20, lg: 24 }}
          lineHeight={0.9}
        >
          {toPersianDigits(display.toString())}+
        </Typography>
        <Typography fontSize={{ xs: 12, sm: 16, md: 18, lg: 20 }} lineHeight={0.9}>
          دقیقه تولید ویدیوئی
        </Typography>
      </motion.div>
    </Stack>
  );
}
