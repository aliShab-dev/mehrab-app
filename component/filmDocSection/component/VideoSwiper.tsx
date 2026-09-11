"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "../css/styles.css";
import { css, Global } from "@emotion/react";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Product } from "@/component/adminPage/components/tabs/MotionGraphy";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const MySwiperStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
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
          background-color: #cfffeb;
          opacity: 1;
        }
      `}
    />
  );
};

const VideoSwiper = ({ videoList }: { videoList: Product[] | [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [externalVideo, setExternalVideo] = useState<{
    url: string;
    poster: string | null;
  } | null>(null);

  const externalPlayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef && videoList.length > 0) {
      swiperRef.slideToLoop(0, 0, false);
      setActiveIndex(0);
      setTimeout(() => swiperRef.update(), 0);
    }
  }, [videoList, swiperRef]);

  const openExternalPlayer = (video: Product) => {
    const fileUrl = video?.files?.[0]?.file;
    if (!fileUrl) return;

    setExternalVideo({
      url: String(fileUrl),
      poster: video.poster ? String(video.poster) : null,
    });
  };

  // When external player is ready → go fullscreen
  const handleExternalReady = () => {
    setTimeout(() => {
      const videoEl = externalPlayerRef.current?.querySelector(
        "video",
      ) as HTMLVideoElement;

      if (!videoEl) return;

      if (videoEl.requestFullscreen) {
        videoEl.requestFullscreen().catch(() => {});
      } else if ((videoEl as any).webkitRequestFullscreen) {
        (videoEl as any).webkitRequestFullscreen();
      } else if ((videoEl as any).webkitEnterFullscreen) {
        (videoEl as any).webkitEnterFullscreen(); // iOS
      }
    }, 300);
  };

  // Close external player when leaving fullscreen
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = !!(
        document.fullscreenElement || (document as any).webkitFullscreenElement
      );

      if (!isFs) {
        setExternalVideo(null);
      }
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
  }, []);

  // Custom Fullscreen button handler
  const handleCustomFullscreen = (index: number) => {
    const video = videoList[index];
    if (!video) return;
    openExternalPlayer(video);
  };

  return (
    <Stack width="100%" mt={1} position="relative">
      {/* ========== EXTERNAL CLEAN PLAYER ========== */}
      {externalVideo && (
        <Box
          ref={externalPlayerRef}
          key={externalVideo.url}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            bgcolor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactPlayer
            url={externalVideo.url}
            playing={true}
            controls
            playsinline
            width="100%"
            height="100%"
            onReady={handleExternalReady}
            config={{
              file: {
                attributes: {
                  playsInline: true,
                  "webkit-playsinline": "true",
                  controlsList: "nodownload",
                },
                forceVideo: true,
              },
            }}
          />
        </Box>
      )}

      <MySwiperStyles />

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
          });
        }}
        breakpoints={{
          0: { slidesPerView: 1.1, spaceBetween: 10 },
          600: { slidesPerView: 1.8, spaceBetween: 30 },
          900: { slidesPerView: 2, spaceBetween: 60 },
        }}
      >
        {videoList.length === 0
          ? Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide
                key={index}
                style={{ width: "50%", borderRadius: 28 }}
              >
                <Stack
                  position="relative"
                  bgcolor="secondary.main"
                  width="100%"
                  sx={{ aspectRatio: "1920/1080" }}
                >
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                </Stack>
              </SwiperSlide>
            ))
          : videoList.map((video, index) => (
              <SwiperSlide
                key={index}
                style={{ width: "50%", borderRadius: 28 }}
              >
                <Stack
                  position="relative"
                  bgcolor="secondary.main"
                  width="100%"
                  sx={{
                    aspectRatio: "1920/1080",
                    "& video": { objectFit: "cover" },
                  }}
                >
                  <ReactPlayer
                    url={video.files[0].file}
                    light={video.poster}
                    controls
                    playsinline
                    playing={activeIndex === index && !externalVideo}
                    width="100%"
                    height="100%"
                    style={{ position: "absolute", top: 0, left: 0 }}
                    config={{
                      file: {
                        attributes: {
                          playsInline: true,
                          "webkit-playsinline": "true",
                          controlsList: isMobile
                            ? "nodownload nofullscreen"
                            : "nodownload",
                        },
                        forceVideo: true,
                      },
                    }}
                  />

                  {/* Custom Fullscreen Button - only on mobile */}
                  {isMobile && (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCustomFullscreen(index);
                      }}
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        right: 12,
                        zIndex: 20,
                        bgcolor: "rgba(0,0,0,0.55)",
                        color: "#fff",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
                        width: 42,
                        height: 42,
                      }}
                    >
                      <FullscreenIcon />
                    </IconButton>
                  )}
                </Stack>
              </SwiperSlide>
            ))}
      </Swiper>
    </Stack>
  );
};

export default VideoSwiper;
