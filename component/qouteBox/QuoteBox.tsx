"use client";

import { Stack, Typography } from "@mui/material";
import Image from "next/image";

const QuoteBox = () => {
  return (
    <Stack
      position={"relative"}
      width={"40%"}
      height={340}
      mt={9}
      mx={"auto"}
      py={2}
      overflow={"visible"}
    >
      <Stack
        position={"absolute"}
        top={0}
        border={(theme) => `1px solid ${theme.palette.secondary.main}`}
        borderRadius={10}
        width={"100%"}
        height={"100%"}
        alignItems={'center'}
      >
        <Image
          src={"/logo.png"}
          alt="logo"
          width={140}
          height={190}
          style={{marginTop: -85}}
        />
      </Stack>

      <Stack
        mr={-3}
        borderRadius={10}
        bgcolor={"#fff"}
        width={"108%"}
        px={5}
        py={9}
        textAlign={"center"}
      >
        <Typography fontSize={22}>
          امروز آثار هنری و رسانه‌ای تبدیل به زبان مشترک همه مردم دنیا شده است و
          به همین خاطر ما در محراب با گرد هم آوردن تیمی متخصص و جوان به دنبال
          خلق آثار باکیفیت هنری، رسانه‌ای هستیم. تا بتوانیم به بهترین شکل،
          دغدغه‌هایمان را به این زبان جهانی بیان کنیم.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default QuoteBox;
