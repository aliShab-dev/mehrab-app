"use client";
import { Stack, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";

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

const SectionHeader = ({ title, backIcon, frontIcon }: SectionHeaderType) => {
  return (
    <Stack mr={1.5} mt={-2.5}>
      <Stack direction={"row"} gap={2.2}>
        <Stack position={"relative"} mt={0.5}>
          <Image
            alt={backIcon.alt}
            src={backIcon.src}
            width={backIcon.width || 100}
            height={backIcon.height || 100}
            style={{
              position: "absolute",
              top: backIcon.position?.top || -50,
              left: backIcon.position?.left || -10,
              zIndex: 90,
            }}
          />
          <Image
            alt={frontIcon.alt}
            src={frontIcon.src}
            width={frontIcon.width || 44}
            height={frontIcon.height || 44}
            style={{ zIndex: 100 }}
          />
        </Stack>
        <Stack>
          <Typography component={"h2"} fontSize={26} fontWeight={600}>
            {title}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SectionHeader;
