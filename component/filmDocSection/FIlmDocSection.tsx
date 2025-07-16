"use client";
import { Button, Stack, Typography } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import { useState } from "react";
import VideoSwiper from "./component/VideoSwiper";

type CategoryItem = { name: string; video: string[] | [] };

type CategoryType = CategoryItem[];

const category: CategoryType = [
  {
    name: "ویدیو کامنت ضبطی",
    video: [
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    ],
  },
  {
    name: "مستند کوتاه",
    video: [
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    ],
  },
  {
    name: "کلیپ",
    video: [
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    ],
  },
  {
    name: "مصاحبه",
    video: [
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    ],
  },
  {
    name: "تیزر گزارشی",
    video: [
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    ],
  },
];

const FilmDocSection = () => {
  const [selectedCategory, setSeletedCategory] = useState<CategoryItem>(
    category[1]
  );
  return (
    <Stack
      height={"auto"}
      width={"100%"}
      mt={5}
      pt={12}
      gap={5}
      sx={{ overflowX: "hidden", overflowY: "clip" }}
    >
      <Stack width={"80%"} mx="auto">
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
          title="برترین‌های فیلم و مستند"
        />
      </Stack>
      <Stack>
        {/* <svg
          width="100%"
          height="775"
          viewBox="0 0 1920 775"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M71 79H-14C-32.7777 79 -48 94.2223 -48 113V741C-48 759.778 -32.7777 775 -14 775H1888.6C1906.33 775 1921.09 761.376 1922.5 743.703L1972.57 115.703C1974.15 95.9223 1958.52 79 1938.68 79H1781C1762.22 79 1747 63.7777 1747 45V34C1747 15.2223 1731.78 0 1713 0H139C120.222 0 105 15.2223 105 34V45C105 63.7777 89.7777 79 71 79Z"
            fill="#3AEDA2"
          />
        </svg> */}
      </Stack>
      <Stack
        width="100%"
        height="auto"
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
            width={"100%"}
            gap={2}
          >
            {category.map((cat) => (
              <Button
                key={cat.name}
                disableRipple
                onClick={() => setSeletedCategory(cat)}
                variant={
                  cat.name == selectedCategory.name ? "contained" : "text"
                }
                sx={{
                  px: 1.8,
                  py: 0.1,
                  borderRadius: 2,
                  color: (theme) =>
                    cat.name == selectedCategory.name
                      ? "#fff"
                      : theme.palette.text.primary,
                  bgcolor:
                    cat.name == selectedCategory.name
                      ? "secondary.main"
                      : "inherit",
                  boxShadow: 0,
                }}
              >
                <Typography fontSize={24}>{cat.name}</Typography>
              </Button>
            ))}
          </Stack>
        </Stack>
        <VideoSwiper videoList={selectedCategory.video} />
      </Stack>
    </Stack>
  );
};

export default FilmDocSection;
