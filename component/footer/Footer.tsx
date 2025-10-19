"use client";

import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  ClickAwayListener,
  IconButton,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  Zoom,
} from "@mui/material";
import Image from "next/image";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { useState } from "react";

const socialMedia = [
  {
    name: "ایتا",
    url: "https://www.aparat.com/mehrab.art",
    icon: "/gs-eita.png",
  },
  {
    name: "اینستاگرام",
    url: "https://www.instagram.com/",
    icon: "/gs-instagram.png",
  },
  {
    name: "تلگرام",
    url: "https://t.me/mehrabartmedia",
    icon: "/gs-telegram.png",
  },
  {
    name: "واتساپ",
    url: "https://t.me/mehrabartmedia",
    icon: "/gs-whatsapp.png",
  },
  {
    name: "ایمیل",
    url: "https://eitaa.com/s/mehrabartmedia",
    icon: "/imail.png",
  },
  {
    name: "آپارات",
    url: "https://eitaa.com/s/mehrabartmedia",
    icon: "/gs-aparat.png",
  },
  {
    name: "تماس با ما",
    url: "https://eitaa.com/s/mehrabartmedia",
    icon: "/gs-phone.png",
  },
];

const StyledTooltip = styled((props: TooltipProps) => {
  const { className, ...other } = props;
  return (
    <Tooltip
      {...other}
      placement="top-end"
      TransitionComponent={Zoom}
      TransitionProps={{
        style: {
          transformOrigin: "20% 100%",
        },
      }}
      classes={{ popper: className }}
    />
  );
})(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    padding: 0,
    maxWidth: "unset",
    borderRadius: 8,
    boxShadow: theme.shadows[4],
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#fff",
  },
}));
const StyledButton = styled((props: ButtonProps) => (
  <Button disableRipple {...props} />
))(({ theme }) => ({
  width: 60,
  backgroundColor: "#fff",
  color: "inherit",
  fontSize: 10,
  fontWeight: 900,
  borderRadius: 14,
  transition: "box-shadow 0.3s ease",
  boxShadow: theme.shadows[1],

  "&:hover": {
    boxShadow: theme.shadows[3],
    color: theme.palette.primary.main,
  },

  [theme.breakpoints.up("md")]: {
    width: 110,
    fontSize: 18,
    fontWeight: 500,
  },
}));

const Footer = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <Stack
      component={"footer"}
      bgcolor={(theme) => theme.palette.primary.main}
      width={"100%"}
      pt={4}
      gap={5}
      position={"relative"}
      pb={1.5}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Stack
          direction={"row"}
          mx={"auto"}
          gap={{ xs: 1, sm: 3, md: 4 }}
          alignItems="center"
        >
          <StyledTooltip
            open={open}
            onClose={handleClose}
            title={
              <Box
                width={250}
                height={150}
                overflow={"hidden"}
                borderRadius={2}
              >
                <iframe
                  title="موسسه محراب"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=34.620278,50.913444&z=15&output=embed"
                />
              </Box>
            }
            arrow
            placement="bottom-start"
          >
            <StyledButton onClick={handleToggle}>لوکیشن</StyledButton>
          </StyledTooltip>

          <StyledButton
            component="a"
            href={"/products"}
            sx={{
              textDecoration: "none",
              bgcolor: "#fff",
            }}
          >
            تولیدات
          </StyledButton>

          <StyledButton
            component="a"
            href={"/"}
            sx={{
              position: { xs: "absolute", md: "relative" },
              top: { xs: 20, md: 0 },
              right: { xs: "calc(50% - 40px)", md: 0 },
              mt: -12.5,
              px: 0,
              width: { xs: 80, md: 100 },
              height: { xs: 100, md: 130 },
            }}
          >
            <Image
              src="/logo.png"
              alt="logo"
              fill
              sizes="(max-width: 600px) 80x, 100px"
              style={{ objectFit: "cover", marginRight: 2 }}
            />
          </StyledButton>
          <StyledButton
            component="a"
            href={"/set-order"}
            sx={{ textDecoration: "none" }}
          >
            ثبت سفارش
          </StyledButton>
          <StyledButton
            component="a"
            href={"/about-us"}
            sx={{ textDecoration: "none" }}
          >
            درباره ما
          </StyledButton>
        </Stack>
      </ClickAwayListener>

      <Stack
        direction={"row"}
        justifyContent={"center"}
        mx={"auto"}
        gap={{ xs: 2, md: 5 }}
        width={"100%"}
        flexWrap={"wrap"}
      >
        {socialMedia.map((item) => (
          <Stack
            key={item.name}
            component={"a"}
            href={item.url}
            sx={{
              textAlign: "center",
              textDecoration: "none",
              borderRadius: 3,
              boxShadow: 2,
              background: "rgba(0, 0, 0, .07)",
              py: 0.5,
              transition: "all .3s ease-out",
              "&:hover": {
                boxShadow: 5,
                transform: "translateY(-3px)",
                background: "rgba(250, 250, 250, .25)",
              },
            }}
          >
            <Avatar
              src={item.icon}
              alt={item.name}
              sx={{
                width: { xs: 50, md: 60 },
                height: { xs: 30, md: 35 },
                cursor: "pointer",
              }}
            />
            <Typography fontSize={{ xs: 10, md: 11 }} color={"white"}>
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Stack mx={"auto"} textAlign={"center"}>
        <Typography fontSize={13} color="secondary.dark">
          حقوق مادی و معنوی سایت متعلق به خانواده هنری محراب می باشد.
        </Typography>
      </Stack>

      <IconButton
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
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
