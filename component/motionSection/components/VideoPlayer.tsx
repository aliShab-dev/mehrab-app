"use-client";
import { Box, Divider, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";

type VideoPlayerType = {
  url: string;
  width?: string | number;
};

const VideoPlayerComponent = ({ url: videoUrl, width }: VideoPlayerType) => {
  return (
    <Stack width="67%" mr={5.5} mt={5.9}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "47%", // your custom aspect ratio
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "#000",
          "& video": {
            objectFit: "cover",
          },
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
      <Stack direction={"row"} mt={4} justifyContent={'space-between'}>
        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{ borderColor: (theme) => theme.palette.primary.main,
                mt: 0, 
            height: '72%'
             }}
          />

          <Stack>
            <Typography fontSize={25} fontWeight={600} color="#8E8E8E">
              {" "}
              نام اثر
            </Typography>
            <Typography mr={-.4} color="#2156C9" fontSize={16} fontWeight={300}> خانواده هنری محراب</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{ borderColor: (theme) => theme.palette.primary.main,
                mt: 0, 
            height: '72%'
             }}
          />

          <Stack>
            <Typography fontSize={25} fontWeight={600} color="#8E8E8E">
              لول کار
            </Typography>
            <Typography mr={-.4} color="#2156C9" fontSize={16} fontWeight={300}> خانواده هنری محراب</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{ borderColor: (theme) => theme.palette.primary.main,
                mt: 0, 
            height: '72%'
             }}
          />

          <Stack>
            <Typography fontSize={25} fontWeight={600} color="#8E8E8E">
              برای کجا بوده
            </Typography>
            <Typography mr={-.4} color="#2156C9" fontSize={16} fontWeight={300}> خانواده هنری محراب</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2.5}>
          <Divider
            orientation="vertical"
            sx={{ borderColor: (theme) => theme.palette.primary.main,
                mt: 0, 
            height: '72%'
             }}
          />

          <Stack>
            <Typography fontSize={25} fontWeight={600} color="#8E8E8E">
              تعداد قسمت‌ها
            </Typography>
            <Typography mr={-.4} color="#2156C9" fontSize={16} fontWeight={300}> خانواده هنری محراب</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoPlayerComponent;
