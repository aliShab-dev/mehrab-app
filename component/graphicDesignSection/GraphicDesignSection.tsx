"use client";

import { Box, Stack, useTheme } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import PosterSwiper from "./component/PosterSwiper";

const GraphicDesignSection = () => {
  const theme = useTheme();
  return (
    <Stack height={700} width={"100%"} mt={20} gap={15}>
      <Stack width={"85%"} mx="auto">
        <SectionHeader
          backIcon={{
            src: "/Paper.png",
            alt: "graphic-design-icon",
            width: 110,
            height: 110,
            position: { left: -20, top: -70 },
          }}
          frontIcon={{
            src: "/Edit Square.png",
            alt: "graphic-design-icon",
            width: 35,
            height: 35,
          }}
          title="گرافیک دیزاین"
        />
      </Stack>

      <Stack width="98.9vw" height="65vh" position="relative">
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          sx={{
            position: "absolute",
            top: "-70%",
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <path
            fill={theme.palette.svgColor.main}
            fillOpacity="1"
            d="M0,224L120,202.7C240,181,480,139,720,138.7C960,139,1200,181,1320,202.7L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          />
        </Box>

        {/* Content area */}
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: theme.palette.svgColor.main,
            position: "relative",
            zIndex: 100,
          }}
        >
          <PosterSwiper />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GraphicDesignSection;
