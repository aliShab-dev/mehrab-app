import { Stack, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TelegramIcon from "@mui/icons-material/Telegram";

import MainBannerClient from "./component/MuiBanner.client";
import StyledButton from "./component/StyledButton";

export default function MainBanner() {
  return (
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
        mt: -6,
      }}
    >
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
          gap: { xs: 1.8, sm: 2, md: 3 },
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
          ما با تولید محتوای خلاقانه و متنوع، به شما کمک می کنیم پیام خود را به
          مخاطبانتان برسانید. از پوستر و موشن گرافیک تا مستندها و کلیپ‌های جذاب،
          هرآنچه که نیاز دارید را در محراب پیدا کنید.
        </Typography>

        <Stack direction={"row"} gap={{ xs: 1, md: 3 }}>
          <StyledButton
            component={"a"}
            href="/products"
            variant="contained"
            endIcon={<StarBorderIcon />}
          >
            نمونه کارها
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

      <MainBannerClient />
    </Stack>
  );
}
