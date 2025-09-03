"use client";
import { Stack, styled, Typography } from "@mui/material";
import Image, { ImageProps, StaticImageData } from "next/image";

type SectionHeaderType = {
  title: string;
  backIcon: {
    alt: string;
    src: string | StaticImageData;
    width?: number;
    height?: number;
    position?: { top?: number; left?: number };
  };
  frontIcon: {
    alt: string;
    src: string | StaticImageData;
    width?: number;
    height?: number;
  };
};

interface ResponsiveImageProps extends ImageProps {
  customWidth?: number;
  customHeight?: number;
}

const ResponsiveImage = styled(Image, {
  shouldForwardProp: (prop) =>
    prop !== "customWidth" && prop !== "customHeight",
})<ResponsiveImageProps>(({ theme, customWidth, customHeight }) => ({
  position: "absolute",
  top: -35,
  left: -10,
  zIndex: 90,
  width: customWidth ?? 70,
  height: customHeight ?? "auto",

  ...(customWidth == null && {
    [theme.breakpoints.up("sm")]: {
      width: 80,
      top: -40,
      left: -15,
    },
    [theme.breakpoints.up("md")]: {
      width: 90,
      top: -45,
      left: -15,
    },
    [theme.breakpoints.up("lg")]: {
      width: 100,
      top: -50,
      left: -15,
    },
  }),
}));

export const ResponsiveFrontImage = styled(Image, {
  shouldForwardProp: (prop) =>
    prop !== "customWidth" && prop !== "customHeight",
})<ResponsiveImageProps>(({ theme, customWidth, customHeight }) => ({
  zIndex: 100,
  width: customWidth ?? 30,
  height: customHeight ?? "auto",

  ...(customWidth == null && {
    [theme.breakpoints.up("sm")]: { width: 30 },
    [theme.breakpoints.up("md")]: { width: 35 },
    [theme.breakpoints.up("lg")]: { width: 40 },
  }),
}));

const SectionHeader = ({ title, backIcon, frontIcon }: SectionHeaderType) => {
  return (
    <Stack mr={{xs: 3.6, sm: 5, md: 1.5}} mt={-2.5}>
      <Stack direction={"row"} gap={{ xs: 1, sm: 1.5, md: 2, lg: 2.2 }}>
        <Stack position={"relative"} mt={0.5}>
          <ResponsiveImage
            alt={backIcon.alt}
            src={backIcon.src}
            customWidth={backIcon.width}
            customHeight={backIcon.height}
            width={1000}
            height={1000}
          />
          <ResponsiveFrontImage
            alt={frontIcon.alt}
            src={frontIcon.src}
            customWidth={frontIcon.width}
            customHeight={frontIcon.height}
            width={1000}
            height={1000}
          />
        </Stack>
        <Stack>
          <Typography
            component={"h2"}
            fontSize={{ xs: 16, sm: 18, md: 20, lg: 26 }}
            fontWeight={800}
          >
            {title}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SectionHeader;
