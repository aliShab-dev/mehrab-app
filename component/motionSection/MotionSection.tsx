"use client";
import { Stack } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import ButtonMenu from "./components/ButtonMenu";
import VideoPlayer from "./components/VideoPlayer";

const MotionSection = () => {
  return (
    <Stack width={"80%"} mx="auto" gap={5}>
      <SectionHeader
        backIcon={{
          alt: "motion-graphic-background-image",
          src: "/motion-back.png",
        }}
        frontIcon={{ alt: "motion-graphic-image", src: "/camera-icon.png" }}
        title="برترین‌های موشن گرافیک"
      />
      <Stack
        direction="row"
        width="93.4%"
        height="100%"
        mx={'auto'}
        gap={4}
        sx={{ aspectRatio: "1920/980" }}
      >
        <ButtonMenu />
        <VideoPlayer url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" />
      </Stack>
    </Stack>
  );
};

export default MotionSection;
