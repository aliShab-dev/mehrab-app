"use client";
import { Button, Stack, Typography } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import { useState } from "react";
import VideoSwiper from "./component/VideoSwiper";

type CategoryItem = { name: string; video: string[] | [] };

type CategoryType = CategoryItem[];

const category: CategoryType = [
  { name: "ویدیو کامنت ضبطی", video: ["https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ,"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ,"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ] },
  { name: "مستند کوتاه", video: ["https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ,"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ,"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"] },
  { name: "کلیپ", video: ["https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ,"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ,"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"] },
  { name: "مصاحبه", video: ["https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ,"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ,"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"] },
  { name: "تیزر گزارشی", video: [ "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" , "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ,"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" ,"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"] },
];

const FilmDocSection = () => {
  const [selectedCategory, setSeletedCategory] = useState<CategoryItem>(
    category[1]
  );
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
