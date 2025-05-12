'use client';
import { Stack } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import ButtonMenu from "./components/ButtonMenu";
import VideoPlayer from "./components/VideoPlayer";

const MotionSection = () => {
  return (
    <Stack height={600} width={'87%'} mx='auto'>
      <SectionHeader
        backIcon={{
          alt: "motion-graphic-background-image",
          src: "/motion-back.png",
        }}
        frontIcon={{ alt: "motion-graphic-image", src: "/Camera.png" }}
        title="برترین‌های موشن گرافی"
      />
      <Stack direction={'row'} width={'100%'}>
        <ButtonMenu />
        <VideoPlayer url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" width={'calc(100% - 344px)'}/>
      </Stack>
    </Stack>
  );
};

export default MotionSection;
