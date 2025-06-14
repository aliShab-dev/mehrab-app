"use client";

import { alpha, Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { css, Global } from "@emotion/react";

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

type CardType = {
  id: string;
  src: string;
  name: string;
  author: string;
  category: string;
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
  cardData: CardType[];
}) => {
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <Stack gap={1} mt={6}>
      <Stack>
        <Typography fontSize={26}>
          {label}
        </Typography>
      </Stack>
      <Box position="relative" dir="rtl" sx={{ overflow: "hidden" }}>
        {isBeginning && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 60,
              height: "100%",
              zIndex: 10,
              background: (theme) =>
                `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
              pointerEvents: "none",
            }}
          />
        )}

        {isEnd && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 60,
              height: "100%",
              zIndex: 10,
              background: (theme) =>
                `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
              pointerEvents: "none",
            }}
          />
        )}
        <MySwiperStyles />
        <Stack direction={"row"} gap={1} mt={1}>
          <Swiper
            dir="rtl"
            slidesPerView="auto"
            spaceBetween={40}
            centeredSlides={false}
            watchOverflow={true}
            onSwiper={(swiper) => {
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
            {cardData.map((data) => (
              <SwiperSlide key={data.name} style={{ width: 250 }}>
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
                    component={"a"}
                    sx={{
                      width: 280,
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
                      <Image
                        src={data.src}
                        alt="image"
                        fill
                        className="zoom-image"
                        style={{
                          objectFit: "cover",
                          transform: "scale(1)",
                          transition: "transform 0.4s ease",
                        }}
                      />
                    </Box>

                    <Box mt={1} position={"relative"}>
                      <Typography width={220} color="#fff" fontSize={20} noWrap>
                        {data.name}
                      </Typography>
                      <Typography
                        width={"100%"}
                        color="#FFCE5C"
                        fontSize={14}
                        noWrap
                      >
                        {data.author}
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
                          width: 50,
                          height: 25,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "#FFE95C",
                          borderRadius: 3,
                        }}
                      >
                        <Typography fontSize={12} color="secondary.dark">
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
