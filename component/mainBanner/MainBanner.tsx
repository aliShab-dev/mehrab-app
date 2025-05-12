'use client';
import { Stack } from "@mui/material";
import Image from "next/image";

const MainBanner = () => {
  return (
    <Stack
      sx={{
        position: "relative",
        width: "92%",
        height: "auto",
        mx: "auto",
      }}
    >
      <Image
        alt="banner"
        src="/banner.png"
        layout="responsive"
        width={1920}
        height={600}
        style={{ marginTop: -65 }}
      />
    </Stack>
  );
};

export default MainBanner;
