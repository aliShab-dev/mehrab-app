"use client";
import { Box, Divider, Stack, styled, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type VideoPlayerType = {
  url: string;
};

const PrimaryText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#8E8E8E",
  fontSize: 14, // default
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 18,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: 25,
  },
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 300,
  color: "#2156C9",
  marginRight: -0.4,
  width: "100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
}));

const VideoPlayerComponent = ({ url: videoUrl }: VideoPlayerType) => {
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
        columnGap={3}
        rowGap={2}
        justifyContent={{xs:"flex-start", md: 'space-between'}}
      >
        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              mt: 0,
              height: "72%",
            }}
          />

          <Stack>
            <PrimaryText>نام اثر</PrimaryText>
            <SecondaryText>خانواده هنری محراب</SecondaryText>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              mt: 0,
              height: "72%",
            }}
          />

          <Stack>
            <PrimaryText>لول کار</PrimaryText>
            <SecondaryText>خانواده هنری محراب</SecondaryText>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              mt: 0,
              height: "72%",
            }}
          />

          <Stack>
            <PrimaryText>برای کجا بوده</PrimaryText>
            <SecondaryText>خانواده هنری محراب</SecondaryText>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              mt: 0,
              height: "72%",
            }}
          />

          <Stack>
            <PrimaryText>تعداد قسمت‌ها</PrimaryText>
            <SecondaryText>خانواده هنری محراب</SecondaryText>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoPlayerComponent;
