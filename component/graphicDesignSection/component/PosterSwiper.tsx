"use client";

import { alpha, IconButton, Stack, Typography } from "@mui/material";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Global } from "@emotion/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperClass } from "swiper/types";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

type Poster = {
  id: number;
  name: string;
  author: string;
  src: string;
};

const posterCats = [
  "هویت بصری",
  "لوگو",
  "اینفوگرافیک",
  "پوستر",
  "تایپوگرافی",
  "جلد کتاب",
  "همه",
];

const posterList1: Poster[] = [
  { id: 1, name: "کوران", author: "کمیل عباس", src: "/poster.png" },
  { id: 2, name: "کمیل", author: "Author C", src: "/poster.png" },
  { id: 3, name: "پوستر اول", author: "کمیل عباس", src: "/book.png" },
  { id: 4, name: "کوران", author: "کمیل ", src: "/poster.png" },
  { id: 5, name: "عباس", author: " عباس", src: "/poster.png" },
  { id: 6, name: "کوران", author: "عباس عباس", src: "/orange.png" },
];

const posterList2: Poster[] = [
  { id: 1, name: "کوران", author: "کمیل عباس", src: "/orange.png" },
  { id: 2, name: "کمیل", author: "Author C", src: "/orange.png" },
  { id: 4, name: "کوران", author: "کمیل ", src: "/book.png" },
  { id: 3, name: "پوستر اول", author: "کمیل عباس", src: "/orange.png" },
  { id: 5, name: "عباس", author: " عباس", src: "/book.png" },
  { id: 6, name: "کوران", author: "عباس عباس", src: "/book.png" },
];

const posterData = posterCats.map((cat, index) => ({
  catName: cat,
  posterList: index % 2 === 0 ? posterList2 : posterList1,
}));

const MySwiperStyles = () => (
  <Global
    styles={{
      ".swiper": {
        paddingTop: 20,
        position: "relative",
      },
      ".custom-swiper .swiper-slide": {
        transition: "transform 0.3s ease, z-index 0.3s",
        transform: "scale(0.75)",
        zIndex: 1,
      },
      ".custom-swiper .swiper-slide-next, .custom-swiper .swiper-slide-prev": {
        transform: "scale(0.9)",
        marginLeft: "10px !important",
        marginRight: "-30px !important",
        zIndex: 2,
      },
      ".custom-swiper .swiper-slide-active": {
        marginLeft: "100px !important",
        marginRight: 60,
        transform: "scale(1.1)",
        zIndex: 3,
      },
      ".swiper-button-prev, .swiper-button-next": {
        top: "100% !important",
        transform: "translateY(-50%)",
        borderRadius: "50%",
        width: 36,
        height: 36,
        zIndex: 100,
      },
      ".swiper-button-prev": {
        position: "absolute",
        left: "calc(50% + 150px)",
        zIndex: 100,
      },
      ".swiper-button-next": {
        position: "absolute",
        right: "calc(50% + 150px)",
        zIndex: 100,
      },
      ".swiper-button-prev::after, .swiper-button-next::after": {
        display: "none",
      },
    }}
  />
);

const PosterSwiper = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState<number>(0);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper as SwiperClass | undefined;
    const prev = prevRef.current;
    const next = nextRef.current;

    if (
      swiperInstance &&
      prev &&
      next &&
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation === "object"
    ) {
      swiperInstance.params.navigation.prevEl = prev;
      swiperInstance.params.navigation.nextEl = next;

      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);

  return (
    <Stack width="100%" mt={-3} height={535} overflow={"visible"}>
      <MySwiperStyles />

      <IconButton
        ref={prevRef}
        disableRipple
        sx={{
          width: 36,
          height: 36,
          pl: 1.4,
          position: "absolute",
          top: "30%",
          left: "calc(50% + 150px)",
          zIndex: 10,
          background: `linear-gradient(to bottom,#37E3C3, #049070)`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <Image
          src={"/Arrow-right.png"}
          alt="'Arrow-left"
          width={16}
          height={16}
        />
      </IconButton>

      <IconButton
        ref={nextRef}
        disableRipple
        sx={{
          width: 36,
          height: 36,
          pr: 1.4,
          position: "absolute",
          top: "30%",
          right: "calc(50% + 150px)",
          zIndex: 10,
          background: `linear-gradient(to bottom,#37E3C3, #049070)`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <Image
          src={"/Arrow-left.png"}
          alt={"Arrow-left"}
          width={16}
          height={16}
        />
      </IconButton>

      <Swiper
        ref={swiperRef}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        slidesPerView={5}
        spaceBetween={40}
        centeredSlides
        loop
        navigation={true}
        modules={[Navigation]}
        className="custom-swiper"
        style={{ paddingBottom: 80 }}
      >
        {posterData[category].posterList.map((poster, index) => (
          <SwiperSlide
            key={poster.id}
            style={{
              borderRadius: 16,
              overflow: "visible",
              transition: "transform 0.3s ease",
            }}
          >
            <Stack p={1} pt={3} textAlign="start" height={"100%"}>
              <Image
                src={poster.src}
                alt={poster.name}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", borderRadius: 12 }}
              />
              <Stack p={0.5} pr={0.8} mt={-0.3}>
                <Typography fontWeight={600} fontSize={14} mt={1}>
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
              {activeIndex == index && (
                <Stack
                  position={"absolute"}
                  bottom={-23}
                  right={"42%"}
                  boxShadow={3}
                  borderRadius={"50%"}
                  color={(theme) => theme.palette.secondary.main}
                  bgcolor={"#fff"}
                  p={0.9}
                  sx={{
                    "&:hover": {
                      color: "#fff",
                      bgcolor: (theme) => theme.palette.secondary.main,
                    },
                  }}
                >
                  <RemoveRedEyeOutlinedIcon sx={{ fontSize: 32 }} />
                </Stack>
              )}
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>

      <Stack
        direction={"row-reverse"}
        gap={2}
        width={"100%"}
        justifyContent={"center"}
      >
        {posterData.map((item, index) => (
          <Stack
            key={item.catName}
            component={"button"}
            onClick={() => setCategory(index)}
            border={"none"}
            borderRadius={2}
            p={0}
            width={80}
            height={75}
            sx={{
              transition: "color 0.3s ease, background 0.3s ease",
              color: category == index ? "#fff" : "inherit",
              background: (theme) =>
                category == index
                  ? `linear-gradient(to bottom,${theme.palette.primary.main}, ${alpha(theme.palette.secondary.dark, .9)})`
                  : `linear-gradient(to bottom,#FFFFFF, #D2D3F0)`,
            }}
          >
            <Typography fontSize={14} m={"auto"}>
              {item.catName}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default PosterSwiper;
