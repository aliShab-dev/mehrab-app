"use client";

import {
  alpha,
  Box,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

interface AudioPlayerProps {
  selectedItem: {
    name: string;
    author: string;
    description: string;
    src?: string;
  };
}

const formatTime = (time: number) => {
  if (!time) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const CustomAudioPlayer = ({ selectedItem }: AudioPlayerProps) => {
  const audioRef = useRef<ReactAudioPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update progress
  useEffect(() => {
    const audio = audioRef.current?.audioEl.current;
    if (!audio) return;

    const updateProgress = () => setPosition(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setMeta);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current?.audioEl.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = duration * percentage;

    const audio = audioRef.current?.audioEl.current;
    if (audio) audio.currentTime = newTime;
    setPosition(newTime);
  };

  useEffect(() => {
    const audio = audioRef.current?.audioEl.current;
    if (audio) {
      audio.pause();
      audio.load();
      setPlaying(false);
      setPosition(0);
      setDuration(0);
    }
  }, [selectedItem]);

  return (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      width={"100%"}
      gap={2}
    >
      <Stack
        width={{ xs: "100%", sm: "50%" }}
        mt={{ xs: 2, sm: 7.5 }}
        gap={0.5}
      >
        <Typography
          width={"100%"}
          noWrap
          fontSize={{ xs: 14, sm: 16, md: 18, lg: 20 }}
          fontWeight={600}
        >
          {selectedItem.name}
        </Typography>
        <Typography
          width={"100%"}
          noWrap
          fontSize={{ xs: 12, sm: 14, md: 16 }}
          color={"#2156C9"}
        >
          {selectedItem.author}
        </Typography>
        <Typography
          mt={1.5}
          pl={2}
          fontSize={14}
          color="#2156C9"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3, // number of lines before "..."
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}
        >
          {selectedItem.description}
        </Typography>
      </Stack>

      <Stack width={{ xs: "100%", sm: "50%" }} alignItems={"center"} gap={2.5}>
        <ReactAudioPlayer
          ref={audioRef}
          src={selectedItem.src || "/bensound-slowmotion.mp3"}
          preload="auto"
          style={{ display: "none" }}
        />

        <IconButton
          onClick={togglePlay}
          sx={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            bgcolor: playing ? "primary.main" : alpha("#DFE0E6", 0.6),
            color: "#fff",
            "&:hover": {
              bgcolor: (theme) =>
                playing
                  ? alpha(theme.palette.primary.main, 0.8)
                  : alpha("#DFE0E6", 0.8),
            },
          }}
        >
          {playing ? (
            <PauseRoundedIcon sx={{ fontSize: 140 }} />
          ) : (
            <PlayArrowRoundedIcon sx={{ fontSize: 140 }} />
          )}
        </IconButton>

        <Box
          sx={{
            width: "100%",
            height: 10,
            bgcolor: "#ccc",
            borderRadius: 5,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            direction: "ltr",
          }}
          onClick={handleProgressClick}
        >
          <Box
            sx={{
              width: `${(position / duration) * 100}%`,
              height: "100%",
              bgcolor: "primary.main",
              borderRadius: 5,
              transition: "width 0.1s linear", // Smooth fill
            }}
          />
        </Box>

        <Stack direction="row" justifyContent="space-between" width="100%">
          <Typography variant="body2">{formatTime(duration)}</Typography>
          <Typography variant="body2">{formatTime(position)}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CustomAudioPlayer;
