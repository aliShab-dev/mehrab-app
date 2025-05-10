import { Stack } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import ButtonMenu from "./components/ButtonMenu";

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
      <Stack>
        <ButtonMenu />
                {/* <VideoPlayer /> */}
      </Stack>
    </Stack>
  );
};

export default MotionSection;
