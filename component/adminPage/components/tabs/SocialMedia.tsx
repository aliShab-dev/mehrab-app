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
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import EditIcon from "@mui/icons-material/Edit";
import InterestsIcon from "@mui/icons-material/Interests";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import {
  deletesocialMedia,
  getsocialMedia,
  postsocialMedia,
} from "../../service/socialMediaServices";

const socialMedia = [
  {
    id: 1,
    platform: "eitaa",
    platform_name: "ایتا",
    link: "https://www.aparat.com/mehrab.art",
    icon: "/gs-eita.png",
  },
  {
    id: 2,
    platform: "instagram",
    platform_name: "اینستاگرام",
    link: "https://www.instagram.com/",
    icon: "/gs-instagram.png",
  },
  {
    id: 3,
    platform: "telegram",
    platform_name: "تلگرام",
    link: "https://t.me/mehrabartmedia",
    icon: "/gs-telegram.png",
  },
  {
    id: 4,
    platform: "whatsapp",
    platform_name: "واتساپ",
    link: "https://t.me/mehrabartmedia",
    icon: "/gs-whatsapp.png",
  },
  {
    id: 5,
    platform: "email",
    platform_name: "ایمیل",
    link: "https://eitaa.com/s/mehrabartmedia",
    icon: "/imail.png",
  },
  {
    id: 6,
    platform: "aparat",
    platform_name: "آپارات",
    link: "https://eitaa.com/s/mehrabartmedia",
    icon: "/gs-aparat.png",
  },
  {
    id: 7,
    platform: "phone",
    platform_name: "تماس با ما",
    link: "https://eitaa.com/s/mehrabartmedia",
    icon: "/gs-phone.png",
  },
];

type socialMediaType = {
  id: number;
  platform: string;
  platform_name: string;
  link: string;
  icon: string;
};

const SocialMedia = () => {
  const [socialMedias, setSocialMedias] =
    useState<socialMediaType[]>(socialMedia);
  const [selectedSM, setSelectedSM] = useState<socialMediaType | null>(null);
  const [link, setLink] = useState("");

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSelectSM = (item: socialMediaType) => {
    setSelectedSM(item);
    setLink(item.link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postsocialMedia({
      link,
      platform: selectedSM?.platform,
      platform_name: selectedSM?.platform_name,
    })
      .then((res) => {
        console.log(res);
        refreshCustomers();
      })
      .catch((err) => console.error(err));

    setLink("");
  };

  const handleDelete = (id: number) => {
    deletesocialMedia({ id: id })
      .then((res) => {
        console.log(res);
        refreshCustomers();
      })
      .catch((err) => console.error(err));
  };

  const refreshCustomers = () => {
    getsocialMedia()
      .then((res) => {
        const updatedSocialMedias = socialMedia.map((item) => {
          const match = res.find((r) => r.platform === item.platform);
          return match
            ? { ...item, link: match.link }
            : item;
        });

        setSocialMedias(updatedSocialMedias);
      })
      .catch((err) => console.error("Failed to fetch customers:", err));
  };

  useEffect(() => {
    refreshCustomers();
  }, []);

  return (
    <Stack width={"100%"} boxShadow={3} borderRadius={4} p={1} gap={1}>
      <Stack direction={"row"} alignItems={"center"} gap={3}>
        <Typography component={"h2"} fontSize={18} pr={1}>
          اعضا:
        </Typography>
      </Stack>

      <Stack width={"100%"} position={"relative"} direction={"row"}>
        <Swiper
          navigation
          modules={[Navigation]}
          slidesPerView={"auto"}
          spaceBetween={20}
        >
          {socialMedias.map((c, i) => (
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
                value={selectedSM?.platform_name}
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
                  !link.trim() ||
                  link.trim() === selectedSM?.link?.trim() ||
                  !selectedSM?.platform_name
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
