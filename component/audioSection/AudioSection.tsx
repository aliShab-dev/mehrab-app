"use client";

import { Stack } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import MockDataList from "./component/AudioList";
import AudioList from "./component/AudioList";
import { useState } from "react";
import AudioPLayer from "./component/AudioPlayer";

export type MockData = {
  id: number;
  name: string;
  author: string;
  audioLength: string;
  description: string;
  url: string;
};

export type MockDataList = MockData[];

const mockDataList: MockDataList = [
  {
    id: 1,
    name: "پادکست به کجا چنین شتابان",
    author: "خانواده هنری محراب",
    audioLength: "1:30",
    description: "lorem ipsom dollar...",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    name: "پادکست به کجا چنین شتابان",
    author: "خانواده هنری محراب",
    audioLength: "1:30",
    description: "lorem ipsom dollar...",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 3,
    name: " کجا چنین شتابان",
    author: "خانواده هنری ",
    audioLength: "1:30",
    description: "lorem ipsom dollar...",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 4,
    name: "پادکست به کجا چنین شتابان",
    author: " هنری محراب",
    audioLength: "1:30",
    description: "lorem ipsom dollar lorem ipsom dollar",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 5,
    name: "پادکست ",
    author: "خانواده ",
    audioLength: "1:30",
    description: "lorem ipsom dollar lorem ipsom dollar lorem ipsom dollar",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 6,
    name: "پادکست  من",
    author: "خانواده من",
    audioLength: "1:50",
    description: "lore lorem ipsom dollar lorem ipsom dollar",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 7,
    name: "پادکست  من",
    author: "خانواده من",
    audioLength: "1:50",
    description: "lore lorem ipsom dollar lorem ipsom dollar",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 8,
    name: "پادکست  من",
    author: "خانواده من",
    audioLength: "1:50",
    description: "lore lorem ipsom dollar lorem ipsom dollar",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
];

const AudioSection = () => {
  const [selectedItem, setSelectedItem] = useState(mockDataList[0]);
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
      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        gap={3}
        width={{xs:'90%' , md: "75%"}}
        height={"auto"}
        mx="auto"
        px={{ xs: 1.4, md: 2 }}
        sx={{
          borderRadius: 6,
          background: (theme) =>
            `linear-gradient(to bottom,rgba(248, 249, 255, .0), ${theme.palette.navbarColor.main})`,
        }}
      >
        <AudioList
          audioListData={mockDataList}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />

        <AudioPLayer selectedItem={selectedItem} />
      </Stack>
    </Stack>
  );
};

export default AudioSection;
