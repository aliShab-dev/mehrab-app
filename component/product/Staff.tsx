"use client";

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";

type Staff = {
  src: string;
  name: string;
  position: string;
};

const Staff = ({ staff }: { staff: Staff[] }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
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
      <Stack direction={"row"} gap={1} mt={1}>
        <Swiper
          dir="rtl"
          slidesPerView="auto"
          spaceBetween={16}
          onSwiper={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);

            swiper.on("slideChange", () => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            });

            swiper.on("reachBeginning", () => setIsBeginning(true));
            swiper.on("reachEnd", () => setIsEnd(true));
            swiper.on("fromEdge", () => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            });
          }}
        >
          {staff.map((s) => (
            <SwiperSlide key={s.name} style={{ width: 200 }}>
              <Box
                sx={{
                  width: "`00%",
                  borderRadius: 3,
                  aspectRatio: "4/5",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "box-shadow .3s ease",
                  "& .staff-desc": {
                    position: "absolute",
                    right: 5,
                    bottom: -18,
                    opacity: 0.3,
                    transition: "bottom 0.3s ease, opacity 1s ease-out",
                  },
                  "&:hover": {
                    boxShadow: 5,
                    "& .staff-desc": {
                      opacity: 1,
                      bottom: 5,
                    },
                  },
                }}
              >
                <Image src={s.src} alt="personel" fill />
                <Stack className="staff-desc">
                  <Typography fontSize={16} fontWeight={700}>
                    {s.name}
                  </Typography>
                  <Typography fontSize={14}>{s.position}</Typography>
                </Stack>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Box>
  );
};

export default Staff;
