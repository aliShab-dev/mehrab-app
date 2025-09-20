"use client";

import { alpha, Box, Skeleton, Stack, Typography } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Dispatch, SetStateAction } from "react";
import { Product } from "@/component/adminPage/components/tabs/MotionGraphy";

const AudioList = ({
  audioListData,
  selectedItem,
  setSelectedItem,
}: {
  audioListData: Product[];
  selectedItem: Product | null;
  setSelectedItem: Dispatch<SetStateAction<Product | null>>;
}) => {
  return (
    <Stack position={"relative"} maxWidth={{ xs: "auto", md: 260 }}>
      <Stack
        width={"100%"}
        gap={3}
        mt={7.5}
        height={250}
        overflow={"hidden"}
        pr={1.5}
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
            backgroundColor: (theme) => theme.palette.secondary.light,
            width: "6px",
            borderRadius: 2,
          },
          "&::-webkit-scrollbar-button": {
            display: "none",
          },
        }}
      >
        {audioListData && audioListData.length > 0
          ? audioListData.map((item) => (
              <Stack
                key={item.id}
                component={"button"}
                bgcolor={selectedItem?.id === item.id ? "primary.main" : "#fff"}
                onClick={() => setSelectedItem(item)}
                width={{ xs: "100%", md: 240 }}
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
                      selectedItem?.id === item.id
                        ? alpha(theme.palette.secondary.main, 1)
                        : "#DFE0E6",
                  }}
                >
                  <PlayArrowRoundedIcon
                    sx={{
                      color:
                        selectedItem?.id === item.id ? "#fff" : "primary.main",
                    }}
                  />
                </Stack>
                <Stack textAlign={"start"} width={"calc(100% - 32px)"}>
                  {item.name ? (
                    <Typography
                      fontSize={12}
                      fontWeight={600}
                      width={"100%"}
                      noWrap
                      sx={{
                        color:
                          selectedItem?.id === item.id ? "#fff" : "inherit",
                      }}
                    >
                      {item.name}
                    </Typography>
                  ) : (
                    <Skeleton
                      variant="text"
                      width={"80%"}
                      sx={{ fontSize: 12 }}
                    />
                  )}
                  {item.company ? (
                    <Typography
                      noWrap
                      fontSize={10}
                      width={"100%"}
                      color="#2156C9"
                    >
                      {item.company}
                    </Typography>
                  ) : (
                    <Skeleton
                      variant="text"
                      width={"60%"}
                      sx={{ fontSize: 10 }}
                    />
                  )}
                </Stack>
              </Stack>
            ))
          : [...Array(5)].map((_, index) => (
              <Stack
                key={index}
                component={"button"}
                bgcolor={"#fff"}
                width={{ xs: "100%", md: 240 }}
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
                <Skeleton
                  variant="circular"
                  width={24}
                  height={24}
                  sx={{ bgcolor: "#DFE0E6" }}
                />
                <Stack textAlign={"start"} width={"calc(100% - 32px)"}>
                  <Skeleton
                    variant="text"
                    width={"80%"}
                    sx={{ fontSize: 12 }}
                  />
                  <Skeleton
                    variant="text"
                    width={"60%"}
                    sx={{ fontSize: 10 }}
                  />
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
          background: (theme) =>
            `linear-gradient(to bottom,rgba(248, 249, 255, .0), ${theme.palette.navbarColor.main})`,
        }}
      ></Box>
    </Stack>
  );
};

export default AudioList;
