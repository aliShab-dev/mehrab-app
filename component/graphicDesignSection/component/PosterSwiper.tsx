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
import { Product } from "@/types/products";
import { SubCategory } from "@/types/categories";

interface PosterSwiperProps {
  posterCats: SubCategory[] | undefined;
  listOfPics: Product[];
  selectedCategory: SubCategory | null;
  setSeletedCategory: (item: SubCategory) => void;
}

interface PosterButtonProps {
  selectedCategoryId: number | undefined;
  category: SubCategory;
  setSeletedCategory: (item: SubCategory) => void;
}

const MySwiperStyles = () => (
  <Global
    styles={{
      ".swiper": {
        paddingTop: 20,
        // direction: 'ltr',
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

const PosterSwiper: React.FC<PosterSwiperProps> = ({
  posterCats,
  selectedCategory,
  setSeletedCategory,
  listOfPics,
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper as SwiperClass | undefined;
    if (swiperInstance && listOfPics.length > 0) {
      swiperInstance.slideToLoop(0, 0, false);

      setTimeout(() => {
        swiperInstance.update();
        if (swiperInstance.params.loop) {
          swiperInstance.loopCreate();
        }
      }, 0);

      setActiveIndex(0);
    }
  }, [listOfPics]);

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
        initialSlide={0}
        spaceBetween={40}
        centeredSlides
        loop
        navigation
        modules={[Navigation]}
        className="custom-swiper"
        style={{ paddingBottom: 100 }}
        onInit={(swiper) => {
          // Force initial update on mount
          swiper.update();
          swiper.updateSize();
          swiper.updateSlides();
          swiper.slideToLoop(0, 0, false);
        }}
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
            slidesPerView: 2.4,
            spaceBetween: 40,
          },
        }}
      >
        {listOfPics &&
          listOfPics.map((poster, index) => (
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
                    src={`${BASE_URL}${poster.file}`}
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
                    طراح: {poster.company}
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

      {isMdUp ? (
        <Stack
          position="absolute"
          bottom={-40}
          direction="row-reverse"
          gap={2.3}
          width="100%"
          justifyContent="center"
        >
          {posterCats &&
            posterCats.map((item, index) => (
              <PosterButton
                key={item.subCatId}
                category={item}
                selectedCategoryId={selectedCategory?.subCatId}
                setSeletedCategory={setSeletedCategory}
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
          {posterCats &&
            posterCats.map((item, index) => (
              <SwiperSlide
                key={item.subCatId}
                style={{ width: 80, height: "auto", background: "transparent" }}
              >
                <PosterButton
                  key={item.subCatId}
                  category={item}
                  selectedCategoryId={selectedCategory?.subCatId}
                  setSeletedCategory={setSeletedCategory}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </Stack>
  );
};

function PosterButton({
  selectedCategoryId,
  category,
  setSeletedCategory,
}: PosterButtonProps) {
  return (
    <Stack
      component="button"
      onClick={() => setSeletedCategory(category)}
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
          selectedCategoryId === category.subCatId
            ? `0 2px 15px 10px ${alpha(theme.palette.primary.main, 0.5)}`
            : 3,
        color: selectedCategoryId === category.subCatId ? "#fff" : "inherit",
        background:
          selectedCategoryId === category.subCatId
            ? `linear-gradient(to bottom,${theme.palette.primary.main}, ${alpha(
                theme.palette.secondary.dark,
                0.9
              )})`
            : `linear-gradient(to bottom,#FFFFFF, #D2D3F0)`,
      })}
    >
      <Typography fontSize={{ xs: 10, md: 14 }} m="auto">
        {category.subCatName}
      </Typography>
    </Stack>
  );
}

export default PosterSwiper;
