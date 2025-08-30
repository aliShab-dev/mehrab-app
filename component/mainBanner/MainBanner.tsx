"use client";

import {
  Button,
  Stack,
  styled,
  Typography,
  ButtonProps,
} from "@mui/material";
import { animate, motion, useMotionValue } from "framer-motion";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useState } from "react";
import { Counter, IconSwinger, ModelCanvas, MouseType } from "./component/subs";


const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 18,
  gap: 5,
  padding: "3px 0px",
  paddingRight: 10,
  fontSize: 12,
  color: "white",
  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  "& .MuiButton-endIcon": {
    fontSize: 20,
    marginBottom: 1,
    "& svg": {
      fontSize: "inherit",
    },
  },
  [theme.breakpoints.up("sm")]: {
    gap: 15,
    fontSize: 18,
    "& .MuiButton-endIcon": {
      fontSize: 26,
      marginBottom: 1,
      "& svg": {
        fontSize: "inherit",
      },
    },
  },
}));

const MainBanner = () => {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  const startCounting = () => {
    count.set(0);
    animate(count, 10000, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Number(latest.toFixed(0)));
      },
    });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Stack
        sx={{
          position: "relative",
          width: { xs: "100%", md: "90%", lg: "68%" },
          aspectRatio: "16 / 9",
          mx: "auto",
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 5,
          mt: -6
        }}
      >
        <IconSwinger />
        <Counter startCounting={startCounting} display={display} />
        <img
          src="/back-banner.png"
          alt="background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />

        <Stack
          sx={{
            position: "absolute",
            top: "20%",
            width: "100%",
            mx: "auto",
            justifyContent: "center",
            alignItems: "center",
            gap: {xs: 1.8, sm: 2, md: 3},
            zIndex: 300,
          }}
        >
          <Typography
            fontSize={{ xs: 16, sm: 20, md: 32 }}
            fontWeight={700}
            color="primary.dark"
          >
            از ایده تا تصویر روایتگر داستان شما
          </Typography>
          <Typography
            fontSize={{ xs: 14, sm: 18, md: 24 }}
            color="secondary.dark"
          >
            "محراب پل ارتباطی بین ایده و مخاطبان"
          </Typography>
          <Typography
            display={{ xs: "none", sm: "block" }}
            fontSize={{ xs: 12, sm: 14, md: 16 }}
            width={{ xs: "80%", sm: "75%", md: "60%" }}
            textAlign={"center"}
          >
            ما با تولید محتوای خلاقانه و متنوع، به شما کمک می کنیم با پیام خود
            را به مخاطبانتان برسانید از پوستر و موشن گرافیک تا مستند ها و کلیپ
            های جذاب هرا آنچه که نیاز دارید را در محراب پیدا کنید..
          </Typography>

          <Stack direction={"row"} gap={{ xs: 1, md: 3 }}>
            <StyledButton
              component={"a"}
              href="/products"
              variant="contained"
              endIcon={<StarBorderIcon />}
            >
              نمونه کار ها
            </StyledButton>
            <StyledButton
              component={"a"}
              href="/set-order"
              variant="contained"
              endIcon={<TelegramIcon />}
            >
              سفارش
            </StyledButton>
          </Stack>
        </Stack>
      </Stack>
    </motion.div>
  );
};

export default MainBanner;
