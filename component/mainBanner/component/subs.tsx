"use client";

import { motion } from "framer-motion";
import { Avatar, Box, Stack, styled, Typography } from "@mui/material";
import { toPersianDigits } from "@/util/numberHandler";

const icons = [
  {
    src: "/k-like.png",
    bottom: { xs: "22%", sm: "22%" },
    right: { xs: "0%", sm: "2%" },
    rotate: "0",
    factor: 1,
    size: { xs: 65, sm: 100, md: 150, lg: 180, xl: 190 },
  },
  {
    src: "/k-camera.png",
    bottom: { xs: "0%", sm: "2%" },
    right: { xs: "18%", sm: "18%" },
    rotate: "0",
    factor: -0.6,
    size: { xs: 80, sm: 150, md: 205, lg: 225, xl: 240 },
  },
  {
    src: "/k-palette.png",
    bottom: "-3.5%",
    right: "42%",
    rotate: "0",
    factor: 1,
    size: { xs: 70, sm: 120, md: 170, lg: 190 },
  },
  {
    src: "/k-clapboard.png",
    bottom: { xs: "8%", sm: "7%" },
    left: { xs: "22%", sm: "22%" },
    rotate: "0",
    factor: 0.4,
    size: { xs: 60, sm: 110, md: 170, lg: 190, xl: 200 },
  },
  {
    src: "/k-film-cam.png",
    bottom: {xs: '19%', sm: '16%'},
    left: {xs: "0%", sm: "2%"},
    rotate: "0",
    factor: -1,
    size: { xs: 80, sm: 150, md: 220, lg: 240, xl: 250 },
  },
];

const MotionStack = motion(Stack);

export type MouseType = {
  x: number;
  y: number;
};

export function IconSwinger() {
  const swingAmplitude = 3;
  const moveAmplitude = 3;

  return (
    <Stack display={{ xs: "flex", sm: "flex" }}>
      {icons.map((icon, index) => {
        const baseRotate = parseFloat(icon.rotate);

        const currentSwing = swingAmplitude;
        const currentMove = moveAmplitude;

        return (
          <MotionStack
            key={index}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
            sx={{
              position: "absolute",
              bottom: icon.bottom,
              right: icon.right,
              left: icon.left,
              zIndex: 400,
              transformStyle: "preserve-3d",
            }}
          >
            <MotionStack
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
                  cursor: "pointer",
                  width: icon.size,
                  height: icon.size,
                  transformStyle: "preserve-3d",
                  transform: `rotate(${icon.rotate})`,
                }}
              />
            </MotionStack>
          </MotionStack>
        );
      })}
    </Stack>
  );
}

const MotionBox = motion(Box);

const CounterContainer = styled(MotionBox)(({ theme }) => ({
  position: "absolute",
  bottom: "6%",
  left: "3%",
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
  [theme.breakpoints.down("sm")]: {
    left: "1%",
    bottom: "3%",
    boxShadow: "0px 2px 6px rgba(0, 0, 15, 0.4)",
    padding: "5px 5px",
  },
}));

export function Counter({
  startCounting,
  display,
}: {
  startCounting: () => void;
  display: number;
}) {
  return (
    <Stack display={{ xs: "flex", sm: "flex" }}>
      <CounterContainer
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        initial={false}
        onViewportEnter={startCounting}
        viewport={{ once: false, amount: 0.3 }}
      >
        <Typography
          fontWeight={700}
          fontSize={{ xs: 10, sm: 18, md: 20, lg: 24 }}
          lineHeight={0.9}
        >
          {toPersianDigits(display.toString())}+
        </Typography>
        <Typography
          fontSize={{ xs: 8, sm: 16, md: 18, lg: 20 }}
          lineHeight={0.9}
        >
          دقیقه تولید ویدیوئی
        </Typography>
      </CounterContainer>
    </Stack>
  );
}
