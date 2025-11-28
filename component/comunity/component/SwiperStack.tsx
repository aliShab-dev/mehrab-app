"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import { getCustomers } from "@/component/adminPage/service/customerServices";
import { Skeleton, Stack } from "@mui/material";

type Customers = {
  id: number;
  name: string;
  logo: string;
};

type SwiperWrapperProps = {
  children: React.ReactNode;
  slidesPerView?: number;
  reverse?: boolean;
};

export const SwiperWrapper = ({
  children,
  slidesPerView = 6,
  reverse = false,
}: SwiperWrapperProps) => {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={20}
      loop={true}
      speed={2000}
      autoplay={{
        delay: 0,
        reverseDirection: reverse,
        disableOnInteraction: false,
      }}
      allowTouchMove={false}
      modules={[Autoplay]}
      breakpoints={{
        0: { slidesPerView: 3, spaceBetween: 10 },
        600: { slidesPerView: 4, spaceBetween: 20 },
        900: { slidesPerView: 6, spaceBetween: 30 },
      }}
      style={{ width: "100%" }}
    >
      {children}
    </Swiper>
  );
};

const Loader = ({...props}) => {
  return (
    <SwiperWrapper {...props}>
      {Array.from({ length: 8 }).map((_, i) => (
        <SwiperSlide key={i} style={{ background: "transparent" }}>
          <Skeleton width={100} height={100} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
};

const SwiperStack = () => {
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    const data = await getCustomers();
    setCustomers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  if (loading)
    return (
      <Stack>
        <Loader />
        <Loader reverse/>
      </Stack>
    );

  return (
    <>
      <SwiperWrapper>
        {customers.map((item) => (
          <SwiperSlide key={item.name} style={{ background: "transparent" }}>
            <Image
              src={item.logo}
              alt={item.name}
              width={100}
              height={100}
              unoptimized
            />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
      <SwiperWrapper reverse>
        {customers.map((item) => (
          <SwiperSlide key={item.name} style={{ background: "transparent" }}>
            <Image
              src={item.logo}
              alt={item.name}
              width={100}
              height={100}
              unoptimized
            />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
    </>
  );
};

export default SwiperStack;
