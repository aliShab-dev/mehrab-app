"use client";

import { Box, Stack, Typography, alpha } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import "swiper/css";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  motion,
  MotionValue,
} from "framer-motion";

type User = {
  id: string;
  src: string;
  name: string;
};

function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
  const opaque = "#F8F9FF";
  const transparent = "transparent";
  const leftInset = "5%";
  const rightInset = "95%";

  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}
export default function UserImageCarousel({
  users,
  initialSelectedId,
}: {
  users: User[];
  initialSelectedId: string;
}) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const progress = useMotionValue(0);
  const maskImage = useScrollOverflowMask(progress);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSelect = (userId: string) => {
    setSelectedId(userId);
  };

  return (
    <Stack direction={"row"} width={"100%"} mx={"auto"}>
      <motion.div style={{ maskImage, width: "100%", direction: "rtl" }}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={12}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={() => {
            if (!swiperRef.current) return;
            const swiperProgress = swiperRef.current.progress;
            progress.set(swiperProgress);
          }}
          onProgress={(swiper, progressValue) => {
            progress.set(progressValue);
          }}
        >
          {users.map((user, index) => {
            const isSelected = user.id === selectedId;

            return (
              <SwiperSlide
                key={user.id}
                style={{
                  width: isSelected ? 280 : 140,
                  transition: "width 0.3s ease",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => handleSelect(user.id)}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    minHeight: 350,
                    ...(isSelected
                      ? { aspectRatio: "4 / 5" }
                      : { height: 350 }),
                    borderRadius: 3,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: isSelected ? "2px solid #1976d2" : "none",
                    filter: isSelected ? "grayscale(0%)" : "grayscale(75%)",
                    transition: "all 0.3s ease",
                    "& p": {
                      color: (theme) => theme.palette.text.primary,
                      fontSize: 18,
                      fontWeight: 700,
                      position: "absolute",
                      right: isSelected ? 20 : -20,
                      bottom: 30,
                      opacity: isSelected ? 1 : 0,
                      transition: "opacity .6s ease-out, right 1.2s ease-out",
                      zIndex: 30,
                    },
                    "& span": {
                      color: (theme) => theme.palette.text.secondary,
                      fontSize: 16,
                      position: "absolute",
                      right: isSelected ? 20 : -20,
                      bottom: 10,
                      opacity: isSelected ? 1 : 0,
                      transition: "opacity .7s ease-out, right .8s ease-out",
                      zIndex: 30,
                    },
                  }}
                >
                  <Image
                    src={user.src}
                    alt={user.name}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <Typography component={"p"}>{user.name}</Typography>
                  <Typography component={"span"}>{"کارشناس فروش"}</Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: 70,
                      bottom: isSelected ? 0 : -50, // slides up/down
                      opacity: isSelected ? 1 : 0, // fade in/out
                      transition: "opacity 0.6s ease, bottom 0.6s ease",
                      background: (theme) =>
                        `linear-gradient(to top, ${
                          theme.palette.secondary.main
                        } 0%,  ${alpha(
                          theme.palette.secondary.light,
                          0.6
                        )} 60%, transparent 100%)`,
                      zIndex: 10,
                    }}
                  />
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>
    </Stack>
  );
}
