import { Button, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Stack component={"main"} sx={{ px: 50, py: 15 }} gap={2}>
      <Stack
        boxShadow={3}
        gap={3}
        height={350}
        borderRadius={5}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          component={"h1"}
          fontSize={32}
          fontWeight={800}
          color="primary"
        >
          404 - صفحه مورد نظر یافت نشد!
        </Typography>
        <Typography
          component={"h1"}
          fontSize={20}
          fontWeight={800}
          color="textSecondary"
        >
          متاسفانه صفحه‌ای که به دنبالش هستید پیدا نشد.
        </Typography>
        <Button href="/" color="primary" sx={{ width: 150, mx: "auto", mt: 2 }}>
          برگشت به صفحه اصلی
        </Button>
      </Stack>
    </Stack>
  );
}
