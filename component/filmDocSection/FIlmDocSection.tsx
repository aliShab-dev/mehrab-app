"use client";
import { Button, Stack, Typography } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import { useState } from "react";
import VideoSwiper from "./component/VideoSwiper";

const category = [
  { name: "ویدیو کامنت ضبطی", video: [] },
  { name: "مستند کوتاه", video: [] },
  { name: "کلیپ", video: [] },
  { name: "مصاحبه", video: [] },
  { name: "تیزر گزارشی", video: [] },
];

const FilmDocSection = () => {
  const [selectedCategory, setSeletedCategory] = useState("ویدیو کامنت ضبطی");
  return (
    <Stack height={700} width={"100%"} mt={11} gap={10}>
      <Stack width={"87%"} mx="auto">
        <SectionHeader
          backIcon={{
            alt: "Film-document-background-image",
            src: "/PolygonFilm.png",
            width: 75,
            height: 75,
            position: { top: -35, left: 10 },
          }}
          frontIcon={{
            alt: "Film-document-image",
            src: "/cameraFilm.png",
            height: 33,
          }}
          title="برترین‌های موشن گرافی"
        />
      </Stack>
      <Stack
        width="100%"
        height={523}
        position="relative"
        alignItems="center"
        bgcolor={"primary.main"}
        borderRadius={"0px 0px 24px 0px"}
      >
        <Stack
          mt={-7}
          bgcolor={"primary.main"}
          mr={3}
          px={4.3}
          py={1.8}
          borderRadius={"24px 24px 0px 0px"}
        >
          <Stack
            direction={"row"}
            bgcolor={"#fff"}
            px={2.8}
            py={1}
            borderRadius={3}
            justifyContent={"space-between"}
            width={"80vw"}
          >
            {category.map((cat) => (
              <Button
                key={cat.name}
                disableRipple
                onClick={() => setSeletedCategory(cat.name)}
                variant={cat.name == selectedCategory ? "contained" : "text"}
                sx={{
                  px: 1.8,
                  py: 0.1,
                  borderRadius: 2,
                  color: (theme) =>
                    cat.name == selectedCategory
                      ? "#fff"
                      : theme.palette.text.primary,
                  bgcolor:
                    cat.name == selectedCategory ? "secondary.main" : "inherit",
                  boxShadow: 0,
                }}
              >
                <Typography fontSize={24}>{cat.name}</Typography>
              </Button>
            ))}
          </Stack>
        </Stack>
        <Stack width={'100%'}>
          <VideoSwiper />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FilmDocSection;
