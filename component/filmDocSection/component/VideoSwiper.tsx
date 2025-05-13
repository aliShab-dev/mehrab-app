"use client";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Stack, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "../css/styles.css";
import { css, Global } from "@emotion/react";
import dynamic from "next/dynamic";
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
  return (
    <Stack width="100%" height={500} mt={3}>
      <MySwiperStyles />
      <Swiper
        slidesPerView="auto" // important: auto sizing
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        style={{ paddingBottom: 80 }}
      >
        {videoList.map((video, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "55%", // this is how we control width per slide
              borderRadius: 28,
              overflow: "clip",
            }}
          >
            <Stack
              position={"relative"}
              bgcolor="secondary.main"
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              sx={{
                "& video": {
                  objectFit: "cover",
                },
              }}
            >
              {/* {video} */}
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
