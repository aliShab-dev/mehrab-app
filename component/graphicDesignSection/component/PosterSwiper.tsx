import { Stack, Typography, useTheme } from "@mui/material";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { css, Global } from "@emotion/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Swiper as SwiperClass } from "swiper/types";

type Poster = {
  id: number;
  name: string;
  author: string;
  src: string;
};

const posterList: Poster[] = [
  { id: 1, name: "کوران", author: "کمیل عباس", src: "/poster.png" },
  { id: 2, name: "کمیل", author: "Author C", src: "/poster.png" },
  { id: 3, name: "پوستر اول", author: "کمیل عباس", src: "/poster.png" },
  { id: 4, name: "کوران", author: "کمیل ", src: "/poster.png" },
  { id: 5, name: "عباس", author: " عباس", src: "/poster.png" },
  { id: 6, name: "کوران", author: "عباس عباس", src: "/poster.png" },
];

const MySwiperStyles = () => (
  <Global
    styles={{
      ".swiper": {
        overflow: "visible",
      },
      ".custom-swiper .swiper-slide": {
        transition: "transform 0.3s ease, z-index 0.3s",
        transform: "scale(0.75)",
        zIndex: 1,
      },
      ".custom-swiper .swiper-slide-next, .custom-swiper .swiper-slide-prev": {
        transform: "scale(0.9)",
        zIndex: 2,
      },
      ".custom-swiper .swiper-slide-active": {
        marginTop: 1    ,
        transform: "scale(1.1)",
        zIndex: 3,
      },
    }}
  />
);

const PosterSwiper = () => {
  const swiperRef = useRef<{
    swiper: SwiperClass;
  }>(null);

  return (
    <Stack width="100%" pt={3}>
      <MySwiperStyles />
      <Swiper
        ref={swiperRef}
        slidesPerView={5}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        className="custom-swiper"
        style={{ paddingBottom: 80 }}
      >
        {posterList.map((poster) => (
          <SwiperSlide
            key={poster.id}
            style={{
              borderRadius: 16,
              overflow: "hidden",
              transition: "transform 0.3s ease",
            }}
          >
            <Stack p={1} textAlign={"start"}>
              <Image
                src={poster.src}
                alt={poster.name}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", borderRadius: 12 }}
              />
              <Stack p={.5} pr={.8} mt={-.3}>
                <Typography  fontWeight={600} fontSize={14} mt={1}>
                  {poster.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontSize={12}
                  color="text.secondary"
                >
                  طراح: {poster.author}
                </Typography>
              </Stack>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default PosterSwiper;
