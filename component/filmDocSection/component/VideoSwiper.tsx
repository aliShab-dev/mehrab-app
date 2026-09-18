"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton, Stack, useTheme, IconButton } from "@mui/material";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "plyr/dist/plyr.css";
import "../css/styles.css";
import { css, Global } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";
import dynamic from "next/dynamic";
import { Product } from "@/component/adminPage/components/tabs/MotionGraphy";

const Plyr = dynamic(() => import("plyr-react").then((mod) => mod.Plyr), {
  ssr: false,
});

const MySwiperStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        /* ========== Plyr Theme Colors ========== */

        :root {
          --plyr-color-main: ${theme.palette.primary.main};
          --plyr-video-control-color: #fff;
          --plyr-video-control-background-hover: ${theme.palette.primary.main};
          --plyr-audio-control-background: ${theme.palette.primary.main};
          --plyr-range-fill-background: ${theme.palette.primary.main};
          --plyr-video-progress-buffered-background: ${theme.palette.secondary
            .main}40;
          --plyr-range-thumb-background: ${theme.palette.primary.main};
          --plyr-range-track-background: rgba(255, 255, 255, 0.25);
        }

        .plyr--full-ui input[type="range"] {
          color: ${theme.palette.primary.main};
        }

        .plyr__control--overlaid {
          background: ${theme.palette.primary.main} !important;
        }

        .plyr__control--overlaid:hover {
          background: ${theme.palette.secondary.main} !important;
        }

        .plyr__control.plyr__control--pressed,
        .plyr__control:hover {
          background: ${theme.palette.primary.main} !important;
        }

        .plyr--video .plyr__control:focus-visible,
        .plyr--video .plyr__control:hover,
        .plyr--video .plyr__control[aria-expanded="true"] {
          background: ${theme.palette.primary.main} !important;
        }

        /* ========== Swiper Styles ========== */

        .swiper {
          padding-bottom: 30px;
        }

        @media (min-width: 600px) {
          .mySwiper .swiper-slide {
            transition:
              transform 0.4s ease,
              z-index 0.4s ease,
              box-shadow 0.4s ease;

            transform: scale(0.75);
            z-index: 1;

            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

            border-radius: 28px;
            overflow: hidden;
          }

          .mySwiper .swiper-slide-active {
            transform: scale(1.1) translateY(10px);
            z-index: 3;

            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
          }

          .mySwiper .swiper-slide-prev,
          .mySwiper .swiper-slide-next {
            transform: scale(0.9);
            z-index: 2;
          }
        }

        @media (max-width: 599px) {
          .mySwiper .swiper-slide {
            border-radius: 16px;
            overflow: hidden;
          }
        }

        .mySwiper .swiper-pagination {
          bottom: -25px !important;
        }

        .mySwiper .swiper-pagination-bullet {
          width: 15px;
          height: 15px;
          margin: 0 6px;
          background-color: ${theme.palette.secondary.main};
          opacity: 0.5;
          border-radius: 50%;
        }

        .mySwiper .swiper-pagination-bullet-active {
          background-color: ${theme.palette.primary.main};
          opacity: 1;
        }
      `}
    />
  );
};

const VideoSwiper = ({ videoList }: { videoList: Product[] | [] }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const [, setActiveIndex] = useState(0);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const handlePrev = () => {
    if (swiperRef && !swiperRef.destroyed) {
      swiperRef.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef && !swiperRef.destroyed) {
      swiperRef.slideNext();
    }
  };

  const pauseAllSwiperVideos = () => {
    slideRefs.current.forEach((slide) => {
      if (!slide) return;

      const videos = slide.querySelectorAll("video");

      videos.forEach((video) => {
        video.pause();
        video.currentTime = video.currentTime;
      });
    });
  };

  useEffect(() => {
    if (swiperRef && videoList.length > 0) {
      swiperRef.slideToLoop(0, 0, false);

      setActiveIndex(0);

      setTimeout(() => {
        swiperRef.update();
      }, 0);
    }
  }, [videoList, swiperRef]);

  return (
    <Stack width="100%" mt={1} position="relative">
      <MySwiperStyles />

      {/* ========== PREVIOUS BUTTON ========== */}

      <IconButton
        ref={prevRef}
        onClick={handlePrev}
        disableRipple
        sx={{
          width: 36,
          height: 36,
          position: "absolute",
          top: "40%",
          left: {
            xs: "calc(90%)",
            sm: "calc(50% + 350px)",
          },
          transform: "translateY(-50%)",
          zIndex: 20,

          background: "linear-gradient(to bottom, #37E3C3, #049070)",

          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",

          "&:hover": {
            background: "linear-gradient(to bottom, #2bc4a6, #037a5a)",
          },
        }}
      >
        <Image src="/Arrow-right.png" alt="Previous" width={16} height={16} />
      </IconButton>

      {/* ========== NEXT BUTTON ========== */}

      <IconButton
        ref={nextRef}
        onClick={handleNext}
        disableRipple
        sx={{
          width: 36,
          height: 36,
          position: "absolute",
          top: "40%",
          right: {
            xs: "90%",
            sm: "calc(50% + 350px)",
          },
          transform: "translateY(-50%)",
          zIndex: 20,

          background: "linear-gradient(to bottom, #37E3C3, #049070)",

          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",

          "&:hover": {
            background: "linear-gradient(to bottom, #2bc4a6, #037a5a)",
          },
        }}
      >
        <Image src="/Arrow-left.png" alt="Next" width={16} height={16} />
      </IconButton>

      {/* ========== SWIPER ========== */}

      <Swiper
        slidesPerView="auto"
        spaceBetween={60}
        centeredSlides
        loop
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        onSwiper={(swiper) => {
          setSwiperRef(swiper);

          setActiveIndex(swiper.realIndex);

          swiper.on("slideChange", () => {
            setActiveIndex(swiper.realIndex);

            pauseAllSwiperVideos();
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
        {/* ========== SKELETON ========== */}

        {videoList.length === 0
          ? Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "50%",
                  borderRadius: 28,
                  overflow: "hidden",
                }}
              >
                <Stack
                  position="relative"
                  bgcolor="secondary.main"
                  width="100%"
                  sx={{
                    aspectRatio: "1920/1080",
                  }}
                >
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                </Stack>
              </SwiperSlide>
            ))
          : /* ========== VIDEO SLIDES ========== */

            videoList.map((video, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "50%",
                  borderRadius: 28,
                }}
              >
                <Stack
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  position="relative"
                  bgcolor="secondary.main"
                  width="100%"
                  sx={{
                    aspectRatio: "1920/1080",

                    borderRadius: {
                      xs: 2,
                      sm: 3.5,
                    },

                    overflow: "hidden",

                    "& .plyr": {
                      height: "100%",
                      width: "100%",
                      borderRadius: "inherit",
                    },

                    "& .plyr__video-wrapper": {
                      height: "100%",
                      borderRadius: "inherit",
                      overflow: "hidden",
                    },

                    "& video": {
                      borderRadius: "inherit",
                    },
                  }}
                >
                  <Plyr
                    source={{
                      type: "video",

                      sources: [
                        {
                          src: video.files[0].file,
                          type: "video/mp4",
                        },
                      ],

                      poster: video.poster || undefined,
                    }}
                    options={{
                      controls: [
                        "play-large",
                        "play",
                        "progress",
                        "current-time",
                        "mute",
                        "volume",
                        "fullscreen",
                      ],

                      autoplay: false,
                      muted: true,
                      clickToPlay: true,

                      // NORMAL PLYR FULLSCREEN
                      fullscreen: {
                        enabled: true,
                        fallback: true,
                        iosNative: true,
                      },
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
