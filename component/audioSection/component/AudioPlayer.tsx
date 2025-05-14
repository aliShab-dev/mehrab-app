import { alpha, IconButton, Slider, Stack, Typography } from "@mui/material";
import { MockData } from "../AudioSection";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  selectedItem: MockData;
};

const AudioPLayer = ({ selectedItem }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setPosition(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (!playing) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch (error) {
      console.error("Audio play error:", error);
    }
  };

  const handleSliderChange = (_: any, value: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Array.isArray(value) ? value[0] : value;
    setPosition(newTime);
    audio.currentTime = newTime;
  };

  console.log(selectedItem.url);

  return (
    <Stack direction={"row"} width={"100%"} gap={3}>
      <Stack width={"50%"} mt={7.5} gap={0.5}>
        <Typography fontSize={22} fontWeight={600}>
          {selectedItem.name}
        </Typography>
        <Typography fontSize={16} color={"#2156C9"}>
          {selectedItem.author}
        </Typography>
        <Typography
          mt={1.5}
          pl={2}
          fontSize={14}
          color="#2156C9"
          overflow={"hidden"}
          sx={{
            height: 100,
            overflowY: "auto",
            overflowX: "clip",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
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
          {selectedItem.description}
        </Typography>
      </Stack>

      <Stack width={"50%"} alignItems={"center"} px={3} gap={2.5}>
        <audio ref={audioRef} src={'/bensound-slowmotion.mp3'} preload="auto" />
        <IconButton
          onClick={togglePlay}
          sx={{
            width: 250,
            height: 250,
            borderRadius: "50%",
            bgcolor: playing ? "primary.main" : alpha("#DFE0E6", 0.6),
            color: "#fff",
          }}
        >
          {playing ? (
            <PauseRoundedIcon sx={{ fontSize: 180 }} />
          ) : (
            <PlayArrowRoundedIcon sx={{ fontSize: 180 }} />
          )}
        </IconButton>

        <Stack width={"100%"}>
          <Slider
            aria-label="time-indicator"
            size="small"
            value={position}
            min={0}
            step={1}
            max={duration}
            onChange={handleSliderChange}
            onChangeCommitted={(_, value) => {
              const audio = audioRef.current;
              if (!audio) return;
              const newTime = Array.isArray(value) ? value[0] : value;
              audio.currentTime = newTime;
              setPosition(newTime);
            }}
            sx={(theme) => ({
                direction: 'ltr',
              height: 12,
              color: theme.palette.primary.main,
              "& .MuiSlider-track": {
                backgroundColor: theme.palette.secondary.main,
                border: "none",
              },
              "& .MuiSlider-rail": {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
              },
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                mr: -3,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&::before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
                  ...(theme.palette.mode === "dark" && {
                    boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
                  }),
                },
                "&.Mui-active": {
                  width: 20,
                  height: 20,
                },
              },
            })}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AudioPLayer;
