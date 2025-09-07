"use client";

import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const orgList = [
  { name: "لوگو خامنه ای دات آی آر", logo: "/khamenei.png" },
  { name: "لوگو آستان حضرت معصومه", logo: "/holy-shrine.png" },
  { name: "لوگوی دفتر تبلیغات", logo: "/hozeh.png" },
  { name: "لوگو تقریب مذاهب", logo: "/mazaheb.png" },
  { name: "لوگوی ارتش", logo: "/militry.png" },
  { name: "لوگو فولاد مبارکه", logo: "/mobarake.png" },
  { name: "لوگوی نهاد ریاست جمهوری", logo: "/president.png" },
  { name: "لوگوی آستان قدس", logo: "/qods.png" },
  { name: "لوگو شهرداری قم", logo: "/qom.png" },
  { name: "لوگوی سپاه", logo: "/sepah.png" },
];

const Comunity = () => {
  return (
    <Stack width={"100%"} mx={"auto"} gap={7} mt={15}>
      <Stack mx={"auto"} direction={"row"} alignItems={"center"} gap={1}>
        <Image src="/contact.png" alt="contact" width={30} height={30} />
        <Typography fontSize={25} fontWeight={600}>
          همراهان ما
        </Typography>
      </Stack>

      <Stack width={{ xs: "90%", md: "75%" }} mx={"auto"} gap={6}>
        <Swiper
          slidesPerView={6}
          spaceBetween={20}
          loop={true}
          speed={2000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          modules={[Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          style={{ width: "100%" }}
        >
          {orgList.map((item) => (
            <SwiperSlide key={item.name}>
              <Image
                src={item.logo}
                alt={item.name}
                width={100}
                height={100}
                unoptimized
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          spaceBetween={20}
          loop={true}
          speed={2000}
          autoplay={{
            delay: 0,
            reverseDirection: true,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          modules={[Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          style={{ width: "100%" }}
        >
          {orgList.map((item) => (
            <SwiperSlide key={item.name}>
              <Image
                src={item.logo}
                alt={item.name}
                width={100}
                height={100}
                unoptimized
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Stack>
  );
};

export default Comunity;
