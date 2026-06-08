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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Product } from "@/types/products";
import { SubCategory } from "@/types/categories";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Reset when listOfPics changes (new tab selected)
  useEffect(() => {
    if (listOfPics.length > 0 && isMounted) {
      const timeoutId = setTimeout(() => {
        const swiperInstance = swiperRef.current?.swiper;

        if (swiperInstance && !swiperInstance.destroyed) {
          try {
            // Reset to first slide
            swiperInstance.slideToLoop(0, 0, false);
            setActiveIndex(0);

            // Update swiper
            swiperInstance.update();

            // Recreate loop if needed and swiper has params
            if (
              swiperInstance.params &&
              swiperInstance.params.loop &&
              listOfPics.length > 1
            ) {
              swiperInstance.loopDestroy();
              swiperInstance.loopCreate();
            }
          } catch (error) {
            console.log("Swiper update error:", error);
          }
        }
      }, 150);

      return () => clearTimeout(timeoutId);
    }
  }, [listOfPics, isMounted]);

  // Setup navigation - simplified approach
  useEffect(() => {
    if (!isMounted) return;

    const setupNavigation = () => {
      const swiperInstance = swiperRef.current?.swiper;
      const prev = prevRef.current;
      const next = nextRef.current;

      if (
        swiperInstance &&
        prev &&
        next &&
        !swiperInstance.destroyed &&
        swiperInstance.navigation
      ) {
        try {
          // Force navigation update
          swiperInstance.navigation.update();
        } catch (error) {
          console.log("Navigation update error:", error);
        }
      }
    };

    // Small delay to ensure everything is ready
    const timer = setTimeout(setupNavigation, 100);
    return () => clearTimeout(timer);
  }, [listOfPics, isMounted, activeIndex]);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Manual navigation handlers
  const handlePrev = () => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance && !swiperInstance.destroyed) {
      swiperInstance.slidePrev();
    }
  };

  const handleNext = () => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance && !swiperInstance.destroyed) {
      swiperInstance.slideNext();
    }
  };

  // Create placeholder slides when there are no items
  const getSlidesToRender = () => {
    if (listOfPics.length > 0) {
      return listOfPics.map((poster, index) => (
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
                src={`${poster.files[0].file}`}
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
              <Typography variant="body2" fontSize={14} color="text.secondary">
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
                onClick={() => {
                  router.push(`/products/${poster.id}`);
                }}
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
      ));
    } else {
      return [1, 2, 3, 4, 5, 6].map((placeholder) => (
        <SwiperSlide
          key={`placeholder-${placeholder}`}
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
                bgcolor: (theme) => theme.palette.grey[200],
              }}
            >
              {/* Placeholder content - you can customize this */}
              <Stack
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                sx={{
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[300]} 100%)`,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16 },
                    textAlign: "center",
                    px: 2,
                  }}
                >
                  در حال بارگذاری...
                </Typography>
              </Stack>
            </Box>

            <Stack p={0.5} pr={0.8} mt={-0.3}>
              <Typography
                fontWeight={600}
                fontSize={14}
                mt={1}
                sx={{
                  height: 20,
                  bgcolor: (theme) => theme.palette.grey[200],
                  borderRadius: 1,
                  width: "80%",
                }}
              >
                &nbsp;
              </Typography>
              <Typography
                variant="body2"
                fontSize={14}
                color="text.secondary"
                sx={{
                  height: 20,
                  bgcolor: (theme) => theme.palette.grey[200],
                  borderRadius: 1,
                  width: "60%",
                  mt: 1,
                }}
              >
                &nbsp;
              </Typography>
            </Stack>
          </Stack>
        </SwiperSlide>
      ));
    }
  };

  return (
    <Stack width="100%" overflow={"visible"} position={"relative"}>
      <MySwiperStyles />

      <IconButton
        ref={prevRef}
        onClick={handlePrev}
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
          "&:hover": {
            background: `linear-gradient(to bottom,#2bc4a6, #037a5a)`,
          },
        }}
      >
        <Image
          src={"/Arrow-right.png"}
          alt="Arrow-left"
          width={16}
          height={16}
        />
      </IconButton>

      <IconButton
        ref={nextRef}
        onClick={handleNext}
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
          "&:hover": {
            background: `linear-gradient(to bottom,#2bc4a6, #037a5a)`,
          },
        }}
      >
        <Image
          src={"/Arrow-left.png"}
          alt={"Arrow-right"}
          width={16}
          height={16}
        />
      </IconButton>

      <Swiper
        key={`swiper-${selectedCategory?.subCatId}-${listOfPics.length}`}
        ref={swiperRef}
        onSlideChange={(swiper) => {
          if (!swiper.destroyed && isMounted) {
            setActiveIndex(swiper.realIndex);
          }
        }}
        onInit={(swiper) => {
          setTimeout(() => {
            if (!swiper.destroyed && isMounted) {
              swiper.slideToLoop(0, 0, false);
              setActiveIndex(0);
              swiper.update();
            }
          }, 50);
        }}
        initialSlide={0}
        spaceBetween={40}
        centeredSlides
        loop={listOfPics.length > 1}
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
            slidesPerView: 2.4,
            spaceBetween: 40,
          },
        }}
      >
        {getSlidesToRender()}
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
                0.9,
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
