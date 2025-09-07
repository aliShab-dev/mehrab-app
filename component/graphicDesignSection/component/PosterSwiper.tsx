"use client";

import {
  alpha,
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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

type PosterCategory = {
  catName: string;
  posterList: Poster[];
};

type PosterButtonProps = {
  item: PosterCategory;
  index: number;
  category: number;
  setCategory: (index: number) => void;
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
        zIndex: 2,
      },
      ".custom-swiper .swiper-slide-active": {
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
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack width="100%" overflow={"visible"} position={"relative"}>
      <MySwiperStyles />

      <IconButton
        ref={prevRef}
        disableRipple
        sx={{
          width: 36,
          height: 36,
          pl: 1.4,
          position: "absolute",
          top: "35%",
          left: { xs: "86%", sm: "calc(50% + 275px)" },
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
          top: "35%",
          right: { xs: "86%", sm: "calc(50% + 275px)" },
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
        spaceBetween={40}
        centeredSlides
        loop
        navigation
        modules={[Navigation]}
        className="custom-swiper"
        style={{ paddingBottom: 100 }}
        breakpoints={{
          0: {
            slidesPerView: 1.18,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {posterData[category].posterList.map((poster, index) => (
          <SwiperSlide
            key={poster.id}
            style={{
              borderRadius: 16,
              overflow: "visible",
              transition: "transform 0.3s ease",
              boxShadow: "0 2px 8px rgba(0,0,1,0.4)",
            }}
          >
            <Stack p={1} textAlign="start" height="100%" width="100%">
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingTop: `${(1080 / 1950) * 100}%`,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={poster.src}
                  alt={poster.name}
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />
              </Box>

              <Stack p={0.5} pr={0.8} mt={-0.3}>
                <Typography fontWeight={600} fontSize={14} mt={1}>
                  {poster.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontSize={14}
                  color="text.secondary"
                >
                  طراح: {poster.author}
                </Typography>
              </Stack>

              {activeIndex === index && (
                <Stack
                  position="absolute"
                  bottom={-23}
                  right="45%"
                  boxShadow={3}
                  borderRadius="50%"
                  color={(theme) => theme.palette.secondary.main}
                  bgcolor="#fff"
                  p={0.9}
                  sx={{
                    cursor: "pointer",
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

      {/* <Stack
        position={"absolute"}
        bottom={-40}
        direction={"row-reverse"}
        gap={2.3}
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
              zIndex: 200,
              cursor: "pointer",
              transition: "color 0.3s ease, background 0.3s ease",
              boxShadow: (theme) =>
                category == index
                  ? `0 2px 15px 10px ${alpha(theme.palette.primary.main, 0.5)}`
                  : 3,
              color: category == index ? "#fff" : "inherit",
              background: (theme) =>
                category == index
                  ? `linear-gradient(to bottom,${
                      theme.palette.primary.main
                    }, ${alpha(theme.palette.secondary.dark, 0.9)})`
                  : `linear-gradient(to bottom,#FFFFFF, #D2D3F0)`,
            }}
          >
            <Typography fontSize={14} m={"auto"}>
              {item.catName}
            </Typography>
          </Stack>
        ))}
      </Stack> */}
      {isMdUp ? (
        <Stack
          position="absolute"
          bottom={-40}
          direction="row-reverse"
          gap={2.3}
          width="100%"
          justifyContent="center"
        >
          {posterData.map((item, index) => (
            <PosterButton
              key={item.catName}
              item={item}
              index={index}
              category={category}
              setCategory={setCategory}
            />
          ))}
        </Stack>
      ) : (
        <Swiper
          slidesPerView="auto"
          spaceBetween={0}
          centeredSlides={false}
          style={{
            position: "absolute",
            bottom: -40,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "auto",
            padding: "20px 16px",
          }}
        >
          {posterData.map((item, index) => (
            <SwiperSlide
              key={item.catName}
              style={{ width: 80, height: "auto", background: "transparent" }}
            >
              <PosterButton
                item={item}
                index={index}
                category={category}
                setCategory={setCategory}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Stack>
  );
};

function PosterButton({
  item,
  index,
  category,
  setCategory,
}: PosterButtonProps) {
  return (
    <Stack
      component="button"
      onClick={() => setCategory(index)}
      border="none"
      borderRadius={2}
      p={0}
      width={{ xs: 55, sm: 60, md: 70, lg: 80 }}
      height={{ xs: 45, sm: 50, md: 60, lg: 75 }}
      sx={(theme) => ({
        zIndex: 200,
        cursor: "pointer",
        transition: "color 0.3s ease, background 0.3s ease",
        boxShadow:
          category === index
            ? `0 2px 15px 10px ${alpha(theme.palette.primary.main, 0.5)}`
            : 3,
        color: category === index ? "#fff" : "inherit",
        background:
          category === index
            ? `linear-gradient(to bottom,${theme.palette.primary.main}, ${alpha(
                theme.palette.secondary.dark,
                0.9
              )})`
            : `linear-gradient(to bottom,#FFFFFF, #D2D3F0)`,
      })}
    >
      <Typography fontSize={{ xs: 10, md: 14 }} m="auto">
        {item.catName}
      </Typography>
    </Stack>
  );
}

export default PosterSwiper;
