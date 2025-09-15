"use client";

import { Stack } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import MockDataList from "./component/AudioList";
import AudioList from "./component/AudioList";
import { useEffect, useState } from "react";
import AudioPLayer from "./component/AudioPlayer";
import { Categories, SubCategory } from "@/app/page";
import AudioClient from "./component/AudioClient";
import { Product } from "../adminPage/components/tabs/MotionGraphy";
import { getProductsByCatId } from "../adminPage/service/postProduct";

export type MockData = {
  id: number;
  name: string;
  author: string;
  audioLength: string;
  description: string;
  url: string;
};

export type MockDataList = MockData[];

interface AudioSectionProps {
  categories: Categories;
}

const AudioSection: React.FC<AudioSectionProps> = ({ categories }) => {
  const [audioSubCats, setAudioSubCats] = useState<SubCategory[]>([]);
  const [audioList, setAudioList] = useState<Product[]>([]);

  // console.log(categories);

  useEffect(() => {
    setAudioSubCats(
      categories.find((cat) => cat.categoryId === 3)?.subCatList || []
    );
  },[categories]);


  useEffect(() => {
    audioSubCats.map((subCat) => {
      getProductsByCatId(subCat)
      .then((res) => {
        // setListOfVideo(res);
      });
      //  .catch((res) => console.log(res));
    }); 
  }, [audioSubCats]);

  return (
    <Stack height={"auto"} width={"100%"} mt={10} gap={5}>
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
      <AudioClient categories={categories} />
    </Stack>
  );
};

export default AudioSection;
