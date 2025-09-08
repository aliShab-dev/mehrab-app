"use client";

import { alpha, Box, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import type { Swiper as SwiperClass } from "swiper";

type Staff = {
  src: string;
  name: string;
  position: string;
};

const Staff = ({ staff }: { staff: Staff[] }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  return (
    <Box position="relative" dir="rtl" sx={{ overflow: "hidden" }}>
      {!isBeginning && (
        <IconButton
          onClick={() => swiperRef?.slidePrev()}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.6),
            color: "primary.main",
            borderRadius: "50%",
            width: { xs: 36, md: 45 },
            height: { xs: 36, md: 45 },
            p: { xs: 1, md: 3 },
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
            },
          }}
        >
          {/* <ChevronRight sx={{ fontSize: 72 }} /> */}
          <Image
            src="/arrow-right.png"
            alt="arrow-right"
            width={24}
            height={24}
          />
        </IconButton>
      )}

      {!isEnd && (
        <IconButton
          onClick={() => swiperRef?.slideNext()}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.6),
            color: "primary.main",
            borderRadius: "50%",
            width: { xs: 36, md: 45 },
            height: { xs: 36, md: 45 },
            p: { xs: 1, md: 3 },
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
            },
          }}
        >
          {/* <ChevronLeft sx={{ ml: -0.6, fontSize: 72 }} /> */}
          <Image
            src="/arrow-left.png"
            alt="arrow-left"
            width={24}
            height={24}
            style={{ transform: "translateX(-2px)" }}
          />
        </IconButton>
      )}
      {!isBeginning && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: { xs: 45, md: 60 },
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
            width: { xs: 45, md: 60 },
            height: "100%",
            zIndex: 10,
            background: (theme) =>
              `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
            pointerEvents: "none",
          }}
        />
      )}
      <Stack direction={"row"} gap={1} mt={1}>
        <Swiper
          dir="rtl"
          slidesPerView="auto"
          spaceBetween={16}
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
          breakpoints={{
            0: {
              slidesPerView: 2.2,
            },
            600: {
              slidesPerView: 4,
            },
          }}
        >
          {staff.map((s) => (
            <SwiperSlide key={s.name} style={{ width: 200 }}>
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 3,
                  aspectRatio: "4/5",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "box-shadow .3s ease",
                  "& .staff-desc": {
                    position: "absolute",
                    right: 5,
                    bottom: -18,
                    opacity: 0.3,
                    transition: "bottom 0.3s ease, opacity 1s ease-out",
                  },
                  "&:hover": {
                    boxShadow: 5,
                    "& .staff-desc": {
                      opacity: 1,
                      bottom: 5,
                    },
                  },
                }}
              >
                <Image src={s.src} alt="personel" fill />
                <Stack className="staff-desc">
                  <Typography fontSize={{ xs: 12, md: 16 }} fontWeight={700}>
                    {s.name}
                  </Typography>
                  <Typography fontSize={{ xs: 12, md: 14 }}>
                    {s.position}
                  </Typography>
                </Stack>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Box>
  );
};

export default Staff;
