"use client";

import { Fade, Stack, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const quotes = [
  {
    title: "هدف ما",
    passage:
      "امروز آثار هنری و رسانه‌ای تبدیل به زبان مشترک همه مردم دنیا شده است و به همین خاطر ما در محراب با گرد هم آوردن تیمی متخصص و جوان به دنبال خلق آثار باکیفیت هنری، رسانه‌ای هستیم. تا بتوانیم به بهترین شکل، دغدغه‌هایمان را به این زبان جهانی بیان کنیم.",
  },
  {
    title: "زبان هنر بیان هنرمندانه",
    passage:
      "رسانه و تولید هنری، کسب و کار ما نیت؛ رسالت ماست. از همین رو برای ما مهم تر از تولید آثار هنری باکیفیت، تشکیل گروهی از هندمندان دغدغه مند است که بتوانند با «زبان» هنر به «بیان» هنرمندانه اندیشه های محکم و ارزشمند بپردازند.",
  },
  {
    title: "آرمان محراب",
    passage:
      "ما اعتقاد داریم که اندیشه ناب اسلام محمدی، غنی ترین و جهانی ترین اندیشه هاست. و تلاش ما در محراب آن است که بتوانیم به بیان هنرمندانه این ارزش‌ها بپردازیم. به این امید که بتوانیم در هیاهوی آثار پوچ و ضدانسانی، هنر خود را به گوش و قلب مخاطبان جهانی برسانیم.",
  },
  {
    title: "خانواده محراب",
    passage:
      "برای رسیدن به آرمان بزرگ محراب، خانواده‌ای از جوان‌های متخصص را دور هم جمع کردیم. هرکس با این ویژگی‌ها می‌تواند عضوی از خانواده ما باشد:\nمتعهد به اندیشه‌های ناب اسلامی و انقلابی باشد تا بتواند برای آرمان محراب تلاش کند.\nپر از شور یادگیری باشد تا بتواند به جدیدترین و به‌روزترین دانش‌های فنی و هنری مسلط شود.\nمنظم و دقیق باشد تا بی‌وقفه و با جدیت در مسیر تولید آثار هنری قدم بردارد.",
  },
];

const QuoteBox = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Stack
      position={"relative"}
      width={"50%"}
      height={300}
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
        alignItems={"center"}
      >
        <Image
          src={"/logo.png"}
          alt="logo"
          width={140}
          height={190}
          style={{ marginTop: -85 }}
        />
      </Stack>

      <Stack
        mr={-4}
        borderRadius={10}
        bgcolor={"#fff"}
        width={"108%"}
        height={"100%"}
        px={5}
        py={12}
        textAlign={"center"}
      >
        <Fade in={true} timeout={1000} key={value}>
          <Typography fontSize={18} whiteSpace="pre-line" textAlign={"justify"}>
            {quotes[value]?.passage}
          </Typography>
        </Fade>
      </Stack>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="تب های اختیارات"
        sx={{ pr: 3, position: "relative", bottom: -30 }}
        slotProps={{ indicator: { style: { display: "none" } } }} // hide the underline
      >
        {quotes.map((quote, index) => (
          <Tab
            key={index}
            label={quote.title}
            disableRipple
            sx={{
              fontSize: 20,
              mx: 1,
              px: 2,
              py: .3,
              borderRadius: 4,
              bgcolor: theme => theme.palette.primary.main,
              color: 'white',
              transition: "all 0.5s ease",
              border: "1px solid transparent",
              "&.Mui-selected": {
                // bgcolor: theme => theme.palette.secondary.main,
                // color: 'white',
                borderColor: (theme) => theme.palette.secondary.main,
                backgroundColor: "#f9f9f9",
              },
            }}
          />
        ))}
      </Tabs>
    </Stack>
  );
};

export default QuoteBox;
