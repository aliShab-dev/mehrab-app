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
  updatSocialMedia,
} from "../../service/socialMediaServices";

const socialMedia = [
  {
    id: null,
    platform: "eitaa",
    platform_name: "ایتا",
    link: "",
    icon: "/gs-eita.png",
  },
  {
    id: null,
    platform: "instagram",
    platform_name: "اینستاگرام",
    link: "",
    icon: "/gs-instagram.png",
  },
  {
    id: null,
    platform: "telegram",
    platform_name: "تلگرام",
    link: "",
    icon: "/gs-telegram.png",
  },
  {
    id: null,
    platform: "whatsapp",
    platform_name: "واتساپ",
    link: "",
    icon: "/gs-whatsapp.png",
  },
  {
    id: null,
    platform: "email",
    platform_name: "ایمیل",
    link: "",
    icon: "/imail.png",
  },
  {
    id: null,
    platform: "aparat",
    platform_name: "آپارات",
    link: "",
    icon: "/gs-aparat.png",
  },
  {
    id: null,
    platform: "phone",
    platform_name: "تماس با ما",
    link: "",
    icon: "/gs-phone.png",
  },
];

type socialMediaType = {
  id: number | null;
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

    if (!!selectedSM?.link.length) {
      updatSocialMedia({
        id: selectedSM?.id,
        href: link,
      })
        .then((res) => {
          console.log(res);
          refreshCustomers();
        })
        .catch((err) => console.error(err));
    } else {
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
    }

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
          const match = res.find((r) => r.platform_name === item.platform_name);
          return match ? { ...item, link: match.link, id: match.id } : item;
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
