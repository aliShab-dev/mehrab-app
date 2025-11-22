"use client";

import {
  alpha,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import EditIcon from "@mui/icons-material/Edit";
import InterestsIcon from "@mui/icons-material/Interests";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

const socialMedia = [
  {
    name: "ایتا",
    link: "https://www.aparat.com/mehrab.art",
    icon: "/gs-eita.png",
  },
  {
    name: "اینستاگرام",
    link: "https://www.instagram.com/",
    icon: "/gs-instagram.png",
  },
  {
    name: "تلگرام",
    link: "https://t.me/mehrabartmedia",
    icon: "/gs-telegram.png",
  },
  {
    name: "واتساپ",
    link: "https://t.me/mehrabartmedia",
    icon: "/gs-whatsapp.png",
  },
  {
    name: "ایمیل",
    link: "https://eitaa.com/s/mehrabartmedia",
    icon: "/imail.png",
  },
  {
    name: "آپارات",
    link: "https://eitaa.com/s/mehrabartmedia",
    icon: "/gs-aparat.png",
  },
  {
    name: "تماس با ما",
    link: "https://eitaa.com/s/mehrabartmedia",
    icon: "/gs-phone.png",
  },
];

type socialMedia = {
  name: string;
  link: string;
  icon: string;
};

const SocialMedia = () => {
  const [selectedSM, setSelectedSM] = useState<socialMedia | null>(null);
  const [link, setLink] = useState("");

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSelectSM = (item: socialMedia) => {
    setSelectedSM(item);
    setLink(item.link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLink("");
  };

  return (
    <Stack width={"100%"} boxShadow={3} borderRadius={4} p={1} gap={1}>
      <Stack direction={"row"} alignItems={"center"} gap={3}>
        <Typography component={"h2"} fontSize={18} pr={1}>
          اعضا:
        </Typography>
      </Stack>

      <Stack width={"100%"} position={"relative"} direction={"row"}>
        <Swiper navigation modules={[Navigation]} slidesPerView={"auto"} spaceBetween={20}>
          {socialMedia.map((c, i) => (
            <SwiperSlide
              style={{
                width: "180px",
                aspectRatio: "1",
                backgroundColor: "#4EBFA8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
              }}
            >
              <Stack
                width="90%"
                height="90%"
                position="relative"
                borderRadius={3}
                overflow="hidden"
              >
                {/* FIXME: complete this shit - delete and add */}
                <Stack
                  sx={{
                    position: "absolute",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    bottom: -10,
                    zIndex: 100,
                  }}
                >
                  <IconButton size="large" onClick={() => handleSelectSM(c)}>
                    <EditIcon fontSize="large" color="primary" />
                  </IconButton>
                </Stack>
                <Image
                  src={c.icon}
                  alt={"random"}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
      <Stack py={2} direction={"row"} gap={2} justifyContent={"center"}>
        <Stack>
          <Box
            sx={{
              border: (theme) => `4px dotted ${theme.palette.primary.main}`,
              width: 180,
              height: 180,
              borderRadius: 3,
              position: "relative",
              "&:hover": {
                cursor: "pointer",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <Stack
              component="label"
              width="100%"
              height="100%"
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                position: "relative",
                borderRadius: 2,
                bgcolor: "secondary.main",
              }}
            >
              <Avatar
                src={selectedSM?.icon || undefined}
                sx={{
                  width: "90%",
                  height: "90%",
                  "& img": {
                    objectFit: "contain", // applies to the inner <img>
                  },
                  background: "transparent",
                }}
                variant="square"
              >
                {!selectedSM?.icon && <InterestsIcon sx={{ fontSize: 64 }} />}
              </Avatar>
            </Stack>
          </Box>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack alignItems={"center"} my={"auto"}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} width={300}>
              <TextField
                label="نام شبکه اجتماعی"
                value={selectedSM?.name}
                fullWidth
                disabled
              />

              <TextField
                label="لینک"
                value={link}
                onChange={handleLink}
                fullWidth
              />

              <Button
                disabled={
                  !link.trim() || link.trim() === selectedSM?.link?.trim()
                }
                type="submit"
                variant="contained"
                color="primary"
              >
                ثبت
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SocialMedia;
