"use client";

import { alpha, Box, IconButton, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { css, Global } from "@emotion/react";
import type { Swiper as SwiperClass } from "swiper";
import { FetchedProduct } from "@/types/products";
import { getFileFormat } from "../ZoomImage/ZoomImage";
import Link from "next/link";
const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const MySwiperStyles = () => {
  return (
    <Global
      styles={css`
        .swiper {
          margin-right: 0 !important;ِ
        }
      `}
    />
  );
};

const CardContainerProduct = ({
  label,
  cardData,
}: {
  label: string;
  cardData: FetchedProduct[] | null | undefined;
}) => {
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  const navigateToProductPage = () => {};

  return (
    <Stack gap={1} mt={6}>
      <Stack>
        <Typography fontSize={{ xs: 16, sm: 18, md: 26 }} fontWeight={600}>
          {label}
        </Typography>
      </Stack>
      <Box position="relative" dir="rtl" sx={{ overflow: "hidden" }}>
        {!isBeginning && (
          <IconButton
            onClick={() => swiperRef?.slidePrev()}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              bgcolor: "primary.main",
              color: "primary.main",
              boxShadow: 2,
              borderRadius: "50%",
              width: { xs: 36, md: 45 },
              height: { xs: 36, md: 45 },
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
          >
            <Image
              src="/arrow-right.png"
              alt="arrow-right"
              width={24}
              height={24}
            />
          </IconButton>
        )}

        {!isEnd && (
          <IconButton
            onClick={() => swiperRef?.slideNext()}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              bgcolor: "primary.main",
              color: "primary.main",
              boxShadow: 2,
              borderRadius: "50%",
              width: { xs: 36, md: 45 },
              height: { xs: 36, md: 45 },
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
          >
            <Image
              src="/arrow-left.png"
              alt="arrow-left"
              width={24}
              height={24}
              style={{ transform: "translateX(-2px)" }}
            />
          </IconButton>
        )}
        {!isBeginning && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: { xs: 30, md: 60 },
              height: "100%",
              zIndex: 10,
              background: (theme) =>
                `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
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
              width: { xs: 30, md: 60 },
              height: "100%",
              zIndex: 10,
              background: (theme) =>
                `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
              pointerEvents: "none",
            }}
          />
        )}
        <MySwiperStyles />
        <Stack direction={"row"} gap={1} mt={1}>
          <Swiper
            dir="rtl"
            slidesPerView="auto"
            spaceBetween={50}
            centeredSlides={false}
            watchOverflow={true}
            onSwiper={(swiper) => {
              setSwiperRef(swiper);

              const updateEdges = () => {
                if (swiper.isLocked) {
                  setIsBeginning(false);
                  setIsEnd(false);
                } else {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }
              };

              updateEdges();

              swiper.on("slideChange", updateEdges);
              swiper.on("reachBeginning", () => setIsBeginning(true));
              swiper.on("reachEnd", () => setIsEnd(true));
              swiper.on("fromEdge", updateEdges);
            }}
          >
            {cardData &&
              cardData.map((data) => (
                <SwiperSlide key={data.name} style={{ width: "auto" }}>
                  <motion.div
                    variants={cardVariants}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      flex: "1 1 280px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      flexDirection={"column"}
                      component={Link}
                      href={`/products/${data.id}`}
                      sx={{
                        width: { xs: 200, md: 250 },
                        textDecoration: "none",
                        color: "inherit",
                        display: "block",
                        borderRadius: 3,
                        backgroundImage: (theme) =>
                          `linear-gradient(to bottom, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,
                        p: 0.6,
                        pb: 1.2,
                        cursor: "pointer",
                        transition: "box-shadow .3s ease",
                        "&:hover": {
                          top: 1,
                          boxShadow: (theme) =>
                            `0px 10px 35px -8px ${theme.palette.secondary.main}`,
                        },
                        "&:hover .image-wrapper": {
                          filter: "none",
                        },
                        "&:hover .zoom-image": {
                          transform: "scale(1.05) !important",
                        },
                      }}
                    >
                      <Box
                        className={"image-wrapper"}
                        sx={{
                          width: "100%",
                          aspectRatio: "4/3",
                          backgroundColor: "#fff",
                          borderRadius: 3,
                          overflow: "hidden",
                          position: "relative",
                          filter: "grayscale(75%)",
                          transition: "filter 0.3s ease",
                        }}
                      >
                        {getFileFormat(`${data.files[0].file}`) !== "photo" ? (
                          <Image
                            src={data?.poster ? `${data.poster}` : ""}
                            alt="image"
                            fill
                            className="zoom-image"
                            style={{
                              objectFit: "cover",
                              transform: "scale(1)",
                              transition: "transform 0.4s ease",
                            }}
                          />
                        ) : (
                          <Image
                            src={`${data.files[0].file}`}
                            alt="image"
                            fill
                            className="zoom-image"
                            style={{
                              objectFit: "cover",
                              transform: "scale(1)",
                              transition: "transform 0.4s ease",
                            }}
                          />
                        )}
                      </Box>

                      <Box mt={1} position={"relative"}>
                        <Typography
                          width={"calc(100% - 55px)"}
                          color="#fff"
                          fontSize={{ xs: 14, md: 20 }}
                          noWrap
                        >
                          {data.name}
                        </Typography>
                        <Typography
                          width={"100%"}
                          color="#FFCE5C"
                          fontSize={{ xs: 12, md: 14 }}
                          noWrap
                        >
                          {data.company}
                        </Typography>
                        <Typography
                          fontSize={12}
                          fontWeight={300}
                          width={"100%"}
                          sx={{
                            mt: 2,
                            color: (theme) =>
                              alpha(theme.palette.primary.main, 0.7),
                          }}
                          noWrap
                        >
                          {data.category}
                        </Typography>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 1,
                            left: 5,
                            width: { xs: 45, ms: 50 },
                            height: { xs: 20, md: 25 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "#FFE95C",
                            borderRadius: 3,
                          }}
                        >
                          <Typography
                            fontSize={{ xs: 10, md: 12 }}
                            color="secondary.dark"
                          >
                            سطح 1
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </SwiperSlide>
              ))}
          </Swiper>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CardContainerProduct;
