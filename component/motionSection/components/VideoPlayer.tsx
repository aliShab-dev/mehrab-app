"use client";
import { Box, Divider, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type VideoPlayerType = {
  url: string;
};

const VideoPlayerComponent = ({ url: videoUrl }: VideoPlayerType) => {
  return (
    <Stack width={'100%'}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: 5,
          backgroundColor: "#000",
          overflow: 'hidden',
          aspectRatio: "1920/1080",
        }}
      >
        <ReactPlayer
          url={videoUrl}
          controls
          playing
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Box>
      <Stack direction={"row"} mt={4} justifyContent={"space-between"}>
        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              mt: 0,
              height: "72%",
            }}
          />

          <Stack>
            <Typography fontSize={25} fontWeight={600} color="#8E8E8E">
              نام اثر
            </Typography>
            <Typography
              mr={-0.4}
              color="#2156C9"
              fontSize={16}
              fontWeight={300}
            >
              خانواده هنری محراب
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              mt: 0,
              height: "72%",
            }}
          />

          <Stack>
            <Typography fontSize={25} fontWeight={600} color="#8E8E8E">
              لول کار
            </Typography>
            <Typography
              mr={-0.4}
              color="#2156C9"
              fontSize={16}
              fontWeight={300}
            >
              خانواده هنری محراب
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              mt: 0,
              height: "72%",
            }}
          />

          <Stack>
            <Typography fontSize={25} fontWeight={600} color="#8E8E8E">
              برای کجا بوده
            </Typography>
            <Typography
              mr={-0.4}
              color="#2156C9"
              fontSize={16}
              fontWeight={300}
            >
              خانواده هنری محراب
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              mt: 0,
              height: "72%",
            }}
          />

          <Stack>
            <Typography fontSize={25} fontWeight={600} color="#8E8E8E">
              تعداد قسمت‌ها
            </Typography>
            <Typography
              mr={-0.4}
              color="#2156C9"
              fontSize={16}
              fontWeight={300}
            >
              خانواده هنری محراب
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoPlayerComponent;
