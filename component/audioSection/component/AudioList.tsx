"use client";

import { alpha, Box, Stack, Typography } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { MockDataList, MockData } from "../AudioSection";
import { Dispatch, SetStateAction } from "react";

const AudioList = ({
  audioListData,
  selectedItem,
  setSelectedItem,
}: {
  audioListData: MockDataList;
  selectedItem: MockData;
  setSelectedItem: Dispatch<SetStateAction<MockData>>;
}) => {
  return (
    <Stack position={"relative"} width={290} mr={-5}>
      <Stack
        gap={3}
        mt={7.5}
        height={250}
        overflow={"hidden"}
        sx={{
          overflowY: "auto",
          direction: "ltr",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#E9E9E9",
            background: `linear-gradient(to bottom, transparent 0%, #E9E9E9 0%, #E9E9E9 100%, transparent 100%)`,
            borderRadius: 2,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4EBFA8",
            width: "6px",
            borderRadius: 2,
          },
          "&::-webkit-scrollbar-button": {
            display: "none",
          },
        }}
      >
        {audioListData.map((item) => (
          <Stack
            key={item.id}
            component={"button"}
            bgcolor={selectedItem.id == item.id ? "primary.main" : "#fff"}
            onClick={() => setSelectedItem(item)}
            width={185}
            height={40}
            direction={"row"}
            alignItems={"center"}
            gap={1}
            sx={{
              direction: "rtl",
              border: "none",
              borderRadius: 2,
              cursor: "pointer",
            }}
          >
            <Stack
              width={24}
              height={25}
              borderRadius={"50%"}
              sx={{
                bgcolor: (theme) =>
                  selectedItem.id == item.id
                    ? alpha(theme.palette.secondary.main, 1)
                    : "#DFE0E6",
              }}
            >
              <PlayArrowRoundedIcon
                sx={{
                  color: selectedItem.id == item.id ? "#fff" : "primary.main",
                }}
              />
            </Stack>
            <Stack textAlign={"start"}>
              <Typography
                fontSize={12}
                fontWeight={600}
                width={140}
                noWrap
                sx={{ color: selectedItem.id == item.id ? "#fff" : "inherit" }}
              >
                {item.name}
              </Typography>
              <Typography width={140} noWrap fontSize={10} color="#2156C9">
                {item.author}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Box
        width="100%"
        height={30}
        position="absolute"
        top={280}
        left={0}
        zIndex={1}
        sx={{
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom,rgba(248, 249, 255, .0), #C8F0E5)",
        }}
      ></Box>
    </Stack>
  );
};

export default AudioList;
