"use client"

import { Stack } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import React, { Suspense } from "react";
import AudioClient from "./component/AudioClient";
import { Categories } from "@/types/categories";

interface AudioSectionProps {
  categories: Categories;
}

const AudioSection: React.FC<AudioSectionProps> = ({categories}) => {
  return (
    <Stack height={"auto"} width={"100%"} mt={15} gap={5}>
      <Stack width={{ xs: "95%", md: "80%" }} mx="auto">
        <SectionHeader
          backIcon={{
            alt: "pudcast-icon",
            src: "/VoiceBackIcon.png",
            width: { xs: 80, sm: 80, md: 90, lg: 110 },
            height: { xs: 80, sm: 80, md: 90, lg: 110 },
            position: {
              xs: { top: -40, left: -15 },
              sm: { top: -40, left: -15 },
              md: { top: -40, left: -15 },
              lg: { top: -50, left: -20 },
            },
          }}
          frontIcon={{ alt: "voice-icon", src: "/Chart.png" }}
          title="برترین‌های صوت و نریشن"
        />
      </Stack>

      <Suspense fallback={<div>درحال بارگزاری..</div>}>
        <AudioClient />
      </Suspense>
    </Stack>
  );
};

export default AudioSection;