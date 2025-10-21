"use client";

import {
  Box,
  IconButton,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import Image from "next/image";
import "swiper/css";
import { useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import type { Swiper as SwiperClass } from "swiper";

type User = {
  id: string;
  src: string;
  name: string;
};

export default function UserImageCarousel({
  users,
  initialSelectedId,
}: {
  users: User[];
  initialSelectedId: string;
}) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const progress = useMotionValue(0);

  const handleSelect = (userId: string) => {
    setSelectedId(userId);
  };

  return (
    <Stack direction={"row"} width={"100%"} mx={"auto"} position={"relative"}>
      {!isBeginning && (
        <IconButton
          onClick={() => swiperRef?.slidePrev()}
          size="large"
          sx={{
            position: "absolute",
            p: 3,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.0),
            color: "primary.main",
            borderRadius: "50%",
            width: 40,
            height: 40,
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
            },
          }}
        >
          <ChevronRight sx={{ fontSize: 72 }} />
        </IconButton>
      )}

      {!isEnd && (
        <IconButton
          onClick={() => swiperRef?.slideNext()}
          size="large"
          sx={{
            position: "absolute",
            p: 3,
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.0),
            color: "primary.main",
            borderRadius: "50%",
            width: 40,
            height: 40,
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
            },
          }}
        >
          <ChevronLeft sx={{ ml: -0.6, fontSize: 72 }} />
        </IconButton>
      )}
      {!isBeginning && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 60,
            height: "100%",
            zIndex: 10,
            background: (theme) =>
              `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
            pointerEvents: "none",
          }}
        />
      )}

      {!isEnd && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 60,
            height: "100%",
            zIndex: 10,
            background: (theme) =>
              `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
            pointerEvents: "none",
          }}
        />
      )}
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        onSwiper={(swiper) => {
          setSwiperRef(swiper);

          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);

          swiper.on("slideChange", () => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          });

          swiper.on("reachBeginning", () => setIsBeginning(true));
          swiper.on("reachEnd", () => setIsEnd(true));
          swiper.on("fromEdge", () => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          });
        }}
      >
        {users.map((user, index) => {
          const isSelected = user.id === selectedId;

          return (
            <SwiperSlide
              key={user.id}
              style={{
                width: isSelected ? (isMobile ? 230 : 280) : 140,
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
                  minHeight: { xs: 300, md: 350 },
                  ...(isSelected
                    ? { aspectRatio: "4 / 5" }
                    : { height: { xs: 300, sm: 350 } }),
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
                  src={
                    typeof user.src === "string" && user.src.trim() !== ""
                      ? user.src
                      : "/avatar.png"
                  }
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
    </Stack>
  );
}
