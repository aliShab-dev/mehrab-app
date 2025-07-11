"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { alpha, Box, IconButton, Stack, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "../css/styles.css";
import { css, Global } from "@emotion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import type { Swiper as SwiperClass } from "swiper";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const MySwiperStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        .mySwiper .swiper-pagination-bullet {
          width: 15px;
          height: 15px;
          margin: 0 6px;
          background-color: ${theme.palette.secondary.main};
          opacity: 0.5;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .mySwiper .swiper-pagination-bullet-active {
          background-color: #cfffeb;
          opacity: 1;
        }
      `}
    />
  );
};

const VideoSwiper = ({ videoList }: { videoList: string[] | [] }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  return (
    <Stack width="100%" height={500} mt={3} position={"relative"} overflow={'clip'}>
      {!isBeginning && (
        <IconButton
          onClick={() => swiperRef?.slidePrev()}
          size="large"
          sx={{
            position: "absolute",
            p: 3,
            right: 40,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.0),
            color: "white",
            borderRadius: "50%",
            width: 80,
            height: 80,
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
              color: "white",
            },
          }}
        >
          <ChevronRight sx={{ fontSize: 100 }} />
        </IconButton>
      )}

      {!isEnd && (
        <IconButton
          onClick={() => swiperRef?.slideNext()}
          size="large"
          sx={{
            position: "absolute",
            p: 3,
            left: 40,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.0),
            color: "white",
            borderRadius: "50%",
            width: 80,
            height: 80,
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
              color: "white",
            },
          }}
        >
          <ChevronLeft sx={{ ml: -0.6, fontSize: 100 }} />
        </IconButton>
      )}
      {!isBeginning && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 250,
            height: "90%",
            zIndex: 10,
            background: (theme) =>
              `linear-gradient(to left, ${theme.palette.primary.main}, transparent)`,
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
            width: 250,
            height: "90%",
            zIndex: 10,
            background: (theme) =>
              `linear-gradient(to right, ${theme.palette.primary.main}, transparent)`,
            pointerEvents: "none",
          }}
        />
      )}
      <MySwiperStyles />
      <Swiper
        slidesPerView="auto"
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        style={{ paddingBottom: 80 }}
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
        {videoList.map((video, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "55%",
              borderRadius: 28,
              overflow: "clip",
            }}
          >
            <Stack
              position="relative"
              bgcolor="secondary.main"
              width="100%"
              sx={{
                aspectRatio: "1950 / 1080",
                "& video": {
                  objectFit: "cover",
                },
              }}
              justifyContent="center"
              alignItems="center"
            >
              <ReactPlayer
                url={video}
                controls
                playing
                width="100%"
                height="100%"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default VideoSwiper;
