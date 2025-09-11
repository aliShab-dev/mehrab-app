import { Stack } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import { Categories } from "@/app/page";
import ClientContainer from "./components/ClientContainer";

interface MotionSectionProps {
  categories: Categories;
}

const MotionSection: React.FC<MotionSectionProps> = ({categories}) => {
  return (
    <Stack width={{ xs: "95%", md: "80%" }} mx="auto" gap={{ xs: 3, md: 5 }}>
      <SectionHeader
        backIcon={{
          alt: "motion-graphic-background-image",
          src: "/motion-back.png",
          width: { xs: 60, sm: 70, md: 80, lg: 90 },
          height: { xs: 60, sm: 70, md: 80, lg: 90 },
          position: {
            xs: { top: -28, left: -10 },
            sm: { top: -32, left: -12 },
            md: { top: -35, left: -12 },
            lg: { top: -42, left: -14 },
          },
        }}
        frontIcon={{ alt: "motion-graphic-image", src: "/camera-icon.png" }}
        title="برترین‌های موشن گرافیک"
      />
      <ClientContainer categories={categories}/>
      
    </Stack>
  );
};

export default MotionSection;
