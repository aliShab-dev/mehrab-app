"use client";
import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
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

  const selectedIndex = category.findIndex(
    (c) => c.name === selectedCategory.name
  );

  return (
    <Stack
      height={"auto"}
      width={"100%"}
      pt={12}
      gap={10}
      sx={{ overflowX: "hidden", overflowY: "clip" }}
    >
      <Stack width={{ xs: "95%", md: "80%" }} mx="auto">
        <SectionHeader
          backIcon={{
            alt: "Film-document-background-image",
            src: "/PolygonFilm.png",
            width: { xs: 45, sm: 50, md: 60, lg: 65 },
            height: { xs: 45, sm: 50, md: 60, lg: 65 },
            position: {
              xs: { top: -23, left: 7 },
              sm: { top: -25, left: 5 },
              md: { top: -30, left: 5 },
              lg: { top: -35, left: 5 },
            },
            style: { transform: "rotate(-15deg)" },
          }}
          frontIcon={{
            alt: "Film-document-image",
            src: "/cameraFilm.png",
          }}
          title="برترین‌های فیلم و مستند"
        />
      </Stack>
      <Stack
        width="100%"
        height="auto"
        position="relative"
        alignItems="center"
        bgcolor={"primary.main"}
        borderRadius={"0px 0px 24px 0px"}
      >
        {/* <Stack
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
            gap={0}
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
                  px: {xs: 0, sm: 1.8},
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
                <Typography fontSize={{ xs: 12, sm: 16, md: 20, lg: 24 }}>
                  {cat.name}
                </Typography>
              </Button>
            ))}
          </Stack>
        </Stack> */}
        <Box
          width={{ xs: "95%", sm: "75%", md: "70%" }}
          mt={-6}
          bgcolor="primary.main"
          px={{ xs: 1, sm: 3, lg: 3 }}
          py={{ xs: 1, sm: 1.2, md: 1.8 }}
          borderRadius="16px 16px 0px 0px"
        >
          <Box
            bgcolor="#fff"
            px={{ xs: 0, sm: 1.8, md: 1.2 }}
            py={1}
            borderRadius={3}
            width="100%"
            overflow="hidden"
          >
            <Tabs
              value={category.findIndex(
                (c) => c.name === selectedCategory.name
              )}
              onChange={(_event: React.SyntheticEvent, newValue: number) =>
                setSeletedCategory(category[newValue])
              }
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              slotProps={{ indicator: { style: { display: "none" } } }}
              sx={{
                "&.MuiTabs-root": {
                  minHeight: 0,
                },
                "& .MuiTabs-flexContainer": {
                  pr: {xs: 31, sm: 20, md: 10, lg: 0},
                  justifyContent: "center",
                },
                "& .MuiTab-root": {
                   marginInlineStart: 1, 
                  px: { xs: 1, sm: 1.2 },
                  py: 0.5,
                  fontSize: { xs: 12, sm: 16, md: 20, lg: 22 },
                  borderRadius: 2,
                  textTransform: "none",
                  minHeight: "0px",
                  color: (theme) => theme.palette.text.primary,
                },
                "& .Mui-selected": {
                  bgcolor: "secondary.main",
                  color: "#fff !important",
                  borderRadius: 2,
                },
              }}
            >
              {category.map((cat) => (
                <Tab key={cat.name} label={cat.name} />
              ))}
            </Tabs>
          </Box>
        </Box>
        <VideoSwiper videoList={selectedCategory.video} />
      </Stack>
    </Stack>
  );
};

export default FilmDocSection;
