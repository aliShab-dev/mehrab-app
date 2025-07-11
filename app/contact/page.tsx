"use client";

import { alpha, Avatar, Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

const socialMedia = [
  {
    name: "آپارات",
    url: "https://www.aparat.com/mehrab.art",
    icon: "/aparat-512.png",
  },
  {
    name: "اینستاگرام",
    url: "https://www.instagram.com/",
    icon: "/instagram-512.png",
  },
  {
    name: "تلگرام",
    url: "https://t.me/mehrabartmedia",
    icon: "/telegram-512.webp",
  },
  {
    name: "ایتا",
    url: "https://eitaa.com/s/mehrabartmedia",
    icon: "/eita.png",
  },
  { name: "بله", url: "https://beehive.com/", icon: "/bale.png" },
];

const pathArray = [
  '"M0 444L30 447.7C60 451.3 120 458.7 180 443.5C240 428.3 300 390.7 360 351C420 311.3 480 269.7 540 280C600 290.3 660 352.7 720 373.7C780 394.7 840 374.3 870 364.2L900 354"',
  "M0 430L30 410C60 390 120 350 180 302.2C240 254.3 300 198.7 360 232.8C420 267 480 391 540 408.7C600 426.3 660 337.7 720 307C780 276.3 840 303.7 870 317.3L900 331",
  "M0 352L30 323.3C60 294.7 120 237.3 180 247.5C240 257.7 300 335.3 360 382.7C420 430 480 447 540 437.5C600 428 660 392 720 395.5C780 399 840 442 870 463.5L900 485",
  "M0 252L30 288.3C60 324.7 120 397.3 180 389.3C240 381.3 300 292.7 360 255.2C420 217.7 480 231.3 540 265.3C600 299.3 660 353.7 720 363.5C780 373.3 840 338.7 870 321.3L900 304",
  "M0 430L30 410C60 390 120 350 180 302.2C240 254.3 300 198.7 360 232.8C420 267 480 391 540 408.7C600 426.3 660 337.7 720 307C780 276.3 840 303.7 870 317.3L900 331",
];

const ContactPage = () => {
  return (
    <Stack
      width={"80%"}
      mx={"auto"}
      textAlign={"center"}
      pt={3}
      pb={10}
      gap={5}
    >
      <Typography component={"h1"} fontSize={36} fontWeight={700}>
        ارتباط با ما
      </Typography>
      <Stack
        position={"relative"}
        bgcolor={"#fff"}
        mx={"auto"}
        width={"80%"}
        height={400}
        borderRadius={3}
        boxShadow={3}
        overflow={"hidden"}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 900 500"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <motion.path
            fill="none"
            stroke="#37E3C3"
            strokeWidth={3}
            initial={{ d: pathArray[0] }}
            animate={{ d: pathArray }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              reverse: true,
              ease: "easeInOut",
            }}
          />
          <motion.path
            fill="none"
            stroke="#4EBFA8"
            strokeWidth={4}
            initial={{ d: pathArray[3] }}
            animate={{ d: pathArray }}
            transform="translateY(-100px)"
            transition={{
              duration: 9,
              repeat: Infinity,
              repeatType: "reverse",
              reverse: true,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
        <Box
          gap={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {socialMedia.map((media, index) => (
            <motion.div
              key={media.name}
              animate={{
                x: [0, 5, -5, 3, -3, 0],
                y: [0, -5, 5, -3, 3, 0],
                rotate: [0, 3, -3, 2, -2, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            >
              <Stack gap={1.2}>
                <Box
                  key={media.name}
                  bgcolor={"background.paper"}
                  width={100}
                  height={100}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={2}
                  boxShadow={3}
                  sx={{
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.2s",
                      boxShadow: 4,
                    },
                  }}
                >
                  <a href={media.url} target="_blank" rel="noopener noreferrer">
                    <Avatar
                      src={media.icon}
                      alt={media.name}
                      sx={{
                        width: "90%",
                        height: "90%",
                        mx: "auto",
                        my: "auto",
                      }}
                    />
                  </a>
                </Box>
                <Typography>{media.name}</Typography>
              </Stack>
            </motion.div>
          ))}
        </Box>
      </Stack>
      <Stack mt={5}>
        <Stack
          position={"relative"}
          bgcolor={"#fff"}
          mx={"auto"}
          width={"80%"}
          height={400}
          borderRadius={3}
          boxShadow={3}
          overflow={"visible"}
        >
          <Stack width="100%" mx="auto" height={"100%"}>
            <Typography
              variant="h5"
              fontSize={28}
              mb={2}
              sx={{
                position: "absolute",
                top: -20,
                width: "100%",
                mx: "auto",
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
              }}
            >
              محل موسسه محراب
            </Typography>
            <Box
              borderRadius={3}
              overflow="hidden"
              boxShadow={3}
              width="100%"
              height={"100%"}
            >
              <iframe
                title="Company Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=34.620278,50.913444&z=15&output=embed"
              ></iframe>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContactPage;
