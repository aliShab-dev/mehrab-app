"use client";

import { Box, Divider, Stack, styled, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { Product } from "./ClientContainer";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type VideoPlayerType = {
  url: string;
  selectedProduct: Product | undefined;
  posterUrl: string;
};

const PrimaryText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#8E8E8E",
  fontSize: 14, // default
  width: "100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 16,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: 20,
  },
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 300,
  color: "#2156C9",
  marginRight: -0.4,
  width: "100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  [theme.breakpoints.up("sm")]: {
    fontSize: 12,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 14,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: 14,
  },
}));

const VideoPlayerComponent = ({
  url: videoUrl,
  selectedProduct,
  posterUrl,
}: VideoPlayerType) => {
  console.log(videoUrl)
  
  return (
    <Stack width={"100%"}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: 5,
          backgroundColor: "#000",
          overflow: "hidden",
          aspectRatio: "1920/1080",
        }}
      >
        <ReactPlayer
          url={videoUrl}
          // src={videoUrl}
          light={posterUrl}
          controls
          playing
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Box>
      <Stack
        width="100%"
        direction="row"
        mt={4}
        flexWrap="wrap"
        columnGap={0}
        rowGap={2}
        justifyContent={{ xs: "flex-start", md: "space-between" }}
      >
        {[
          {
            title: "نام اثر",
            value: selectedProduct ? selectedProduct.name : "---",
          },
          {
            title: "لول کار",
            value: selectedProduct ? `سطح ${selectedProduct.level}` : "---",
          },
          {
            title: "برای کجا بوده",
            value: selectedProduct ? selectedProduct.company : "---",
          },
          {
            title: "تعداد قسمت‌ها",
            value: selectedProduct
              ? selectedProduct.episode ?? "تک قسمت"
              : "تک قسمت",
          },
        ].map((item, i) => (
          <Stack
            key={i}
            direction="row"
            gap={1.5}
            minWidth={0}
            sx={{
              flexBasis: { xs: "50%", sm: "25%" },
              flexGrow: 1,
            }}
          >
            <Divider
              orientation="vertical"
              sx={(theme) => ({
                borderColor: theme.palette.primary.main,
                mt: 0,
                height: "72%",
              })}
            />

            <Stack width="100%" minWidth={0}>
              <PrimaryText>{item.title}</PrimaryText>
              <SecondaryText>{item.value}</SecondaryText>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default VideoPlayerComponent;
