"use client";

import { Box, Stack, useTheme } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import PosterSwiper from "./component/PosterSwiper";

const GraphicDesignSection = () => {
  const theme = useTheme();
  return (
    <Stack width={"100%"} height={"auto"} mt={12}>
      <Stack  width={{ xs: "90%", md: "80%" }}  mx="auto">
        <SectionHeader
          backIcon={{
            src: "/Paper.png",
            alt: "graphic-design-icon",
            width: { xs: 80, sm: 90, md: 100, lg: 110 },
            height: { xs: 80, sm: 90, md: 100, lg: 110 },
            position: {
              xs: { top: -40, left: -12 },
              sm: { top: -40, left: -10 },
              md: { top: -45, left: -12 },
              lg: { top: -55, left: -18 },
            },
          }}
          frontIcon={{
            src: "/Edit Square.png",
            alt: "graphic-design-icon",
          }}
          title="گرافیک دیزاین"
        />
      </Stack>

      <Stack
        width="100%"
        mt={{xs: 0, sm: -6}}
        position="relative"
      >
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          sx={{
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
            height: "auto",
            bgcolor: theme.palette.svgColor.main,
            position: "relative",
            zIndex: 100,
            mt: -0.5,
          }}
        >
          <PosterSwiper />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GraphicDesignSection;
