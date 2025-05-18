import {
  Button,
  ButtonProps,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Image from "next/image";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

const contactUs = [
  "ایتا",
  "اینستاگرام",
  "تلگرام",
  "واتس آپ",
  "ایمیل",
  "آپارات",
  "تماس",
];

const StyledButton = styled((props: ButtonProps) => (
  <Button disableRipple {...props} />
))(({ theme }) => ({
  width: 110,
  backgroundColor: "#fff",
  color: "inherit",
  fontSize: 18,
  borderRadius: 14,
  paddingTop: 5,
  paddingBottom: 5,
  paddingRight: 0,
  paddingLeft: 0,
  transition: "box-shadow 0.3s ease",
  boxShadow: theme.shadows[1],
  "&:hover": {
    boxShadow: theme.shadows[3],
    color: theme.palette.primary.main,
  },
}));

const Footer = () => {
  return (
    <Stack
      bgcolor={(theme) => theme.palette.primary.main}
      height={184}
      width={"100%"}
      pt={4}
      gap={2}
      position={"relative"}
    >
      <Stack direction={"row"} mx={"auto"} gap={2.1} alignItems="center">
        <StyledButton
          sx={{
            bgcolor: "#fff",
          }}
        >
          تولیدات
        </StyledButton>
        <StyledButton>لوکیشن</StyledButton>
        <StyledButton sx={{ mt: -12.5, px: 0, pr: 1, width: 100 }}>
          <Image src={"/logo.png"} alt="logo" width={80} height={130} />
        </StyledButton>
        <StyledButton>ثبت سفارش</StyledButton>
        <StyledButton>ارتباط با ما</StyledButton>
      </Stack>

      <Stack direction={"row"} mx={"auto"} gap={5} mt={0.5}>
        {contactUs.map((item) => (
          <Typography key={item} color="#fff" fontSize={14}>
            {item}
          </Typography>
        ))}
      </Stack>
      <Stack mx={"auto"}>
        <Typography fontSize={13} color="secondary.dark">
          حقوق مادی و معنوی سایت متعلق به طراح سایت کمیل عباس محفوظ است
        </Typography>
      </Stack>

      <IconButton
        sx={{
          position: "absolute",
          top: -18,
          left: 30,
          color: (theme) => theme.palette.secondary.main,
          bgcolor: "#fff",
          boxShadow: 3,
          "&:hover": {
            bgcolor: "#fff",
            boxShadow: 5,
          },
        }}
      >
        <KeyboardArrowUpRoundedIcon />
      </IconButton>
    </Stack>
  );
};

export default Footer;
