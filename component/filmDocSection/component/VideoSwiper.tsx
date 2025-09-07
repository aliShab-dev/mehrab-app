"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, IconButton, Stack, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "../css/styles.css";
import { css, Global } from "@emotion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import Image from "next/image";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const MySwiperStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        .mySwiper .swiper-slide {
          transition: transform 0.4s ease, z-index 0.4s ease,
            box-shadow 0.4s ease;
          transform: scale(0.75);
          z-index: 1;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* default shadow */
          border-radius: 28px;
        }

        .mySwiper .swiper-slide-active {
          transform: scale(1);
          z-index: 3;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5); /* stronger shadow for active */
        }

        .mySwiper .swiper-slide-prev,
        .mySwiper .swiper-slide-next {
          transform: scale(0.9);
          z-index: 2;
        }
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
    <Stack width="100%" mt={3} position={"relative"}>
      {!isBeginning && (
        <IconButton
          onClick={() => swiperRef?.slidePrev()}
          size="large"
          sx={{
            width: { xs: 32, sm: 43 },
            height: { xs: 32, sm: 43 },
            pl: 1.4,
            position: "absolute",
            top: { xs: "38%", sm: "40%" },
            left: {
              xs: "calc(85%)",
              sm: "calc(80%)",
              md: "calc(78%)",
              lg: "calc(60% + 255px)",
            },
            zIndex: 100,
            background: `linear-gradient(to bottom,#37E3C3, #049070)`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Image
            src={"/Arrow-right.png"}
            alt="'Arrow-left"
            width={19}
            height={19}
          />
        </IconButton>
      )}

      {!isEnd && (
        <IconButton
          onClick={() => swiperRef?.slideNext()}
          size="large"
          sx={{
            width: { xs: 32, sm: 43 },
            height: { xs: 32, sm: 43 },
            pl: 1.4,
            position: "absolute",
            top: { xs: "38%", sm: "40%" },
            right: {
              xs: "calc(85%)",
              sm: "calc(80%)",
              md: "calc(78%)",
              lg: "calc(60% + 255px)",
            },
            zIndex: 100,
            background: `linear-gradient(to bottom,#37E3C3, #049070)`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Image
            src={"/Arrow-left.png"}
            alt="'Arrow-left"
            width={19}
            height={19}
          />
        </IconButton>
      )}
      {!isBeginning && (
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
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
            display: { xs: "none", sm: "block" },
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
        spaceBetween={60}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
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
            slidesPerView: 1.1,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 1.8,
            spaceBetween: 30,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 60,
          },
        }}
      >
        {videoList.map((video, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "50%",
              borderRadius: 28,
              overflow: "clip",
            }}
          >
            <Stack
              position="relative"
              bgcolor="secondary.main"
              width="100%"
              sx={{
                aspectRatio: "1920 / 1080",
                "& video": {
                  objectFit: "cover",
                },
              }}
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
