"use client";

import { useEffect, useRef, useState } from "react";
import {
  alpha,
  Box,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FetchedProduct } from "@/types/products";
import dynamic from "next/dynamic";
import ReactAudioPlayer from "react-audio-player";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import { FileType } from "../adminPage/components/tabs/Graphic";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const formatTime = (time: number) => {
  if (!time) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export function getFileFormat(
  filePath: string
): "photo" | "video" | "audio" | "unknown" {
  const extension = filePath && filePath.split(".").pop()?.toLowerCase();

  const photoExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const videoExtensions = ["mp4", "mpeg", "ogg", "webm", "avi", "mov"];
  const audioExtensions = ["mp3", "wav", "ogg", "aac"];

  if (extension) {
    if (photoExtensions.includes(extension)) return "photo";
    if (videoExtensions.includes(extension)) return "video";
    if (audioExtensions.includes(extension)) return "audio";
  }

  return "unknown";
}

const ZoomImageModal = ({ src, alt }: { src: FileType[]; alt?: string }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const handleClose = () => setOpen(false);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        style={{ width: "100%", height: "100%" }}
        onSwiper={(swiper) => {
          const activeIndex = swiper.activeIndex;
          const activeImage = src[activeIndex];
          setSelectedFile(`${activeImage.file}`);
        }}
        onSlideChange={(swiper) => {
          const activeIndex = swiper.activeIndex;
          const activeImage = src[activeIndex];
          setSelectedFile(`${activeImage.file}`);
        }}
      >
        {src.map((img) => (
          <SwiperSlide key={img.id}>
            <Box
              component="img"
              src={img.file}
              alt={alt || ""}
              sx={{
                aspectRatio: "1920 / 1080",
                width: "100%",
                objectFit: "cover",
                cursor: "zoom-in",
                borderRadius: 2,
              }}
              onClick={() => setOpen(true)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Box
          onClick={handleClose}
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="img"
            src={selectedFile}
            alt={alt || ""}
            onClick={(e) => e.stopPropagation()}
            sx={{
              height: "75%",
              width: "auto",
              objectFit: "contain",
              cursor: "default",
              transform: "scale(1)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Box>
      </Dialog>
    </>
  );
};

const VideoPlayer = ({ product }: { product: FetchedProduct }) => {
  return (
    <>
      <ReactPlayer
        url={`${product.files[0].file}`}
        light={`${product.poster}`}
        controls
        playing
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        onError={(e) => console.error("ReactPlayer Error:", e)}
      />
    </>
  );
};

const AudioPlayer = ({ product }: { product: FetchedProduct }) => {
  const audioRef = useRef<ReactAudioPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const isSelectedItemEmpty = !product || Object.keys(product).length === 0;
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

  useEffect(() => {
    const audio = audioRef.current?.audioEl.current;
    if (audio) {
      audio.pause();
      audio.load();
      setPlaying(false);
      setPosition(0);
      setDuration(0);
    }
  }, [product]);

  const togglePlay = () => {
    const audio = audioRef.current?.audioEl.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch((error) => console.error("Playback failed:", error));
    }
    setPlaying(!playing);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current?.audioEl.current;
    if (!audio || audio.readyState < 2 || isNaN(duration)) {
      console.warn("Cannot seek: Audio not ready", {
        readyState: audio?.readyState,
        duration,
      });
      return;
    }

    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = duration * percentage;

    const wasPlaying = playing;
    audio.pause();
    audio.currentTime = newTime;
    setPosition(newTime);
    if (wasPlaying) {
      audio
        .play()
        .catch((error) => console.error("Resume after seek failed:", error));
    }
  };
  return (
    <Stack
      width={"90%"}
      height={"100%"}
      alignItems="center"
      justifyContent={"space-around"}
    >
      <ReactAudioPlayer
        ref={audioRef}
        src={
          product?.files[0].file
            ? `${product?.files[0].file}`
            : "/bensound-slowmotion.mp3"
        }
        preload="auto"
        style={{ display: "none" }}
      />

      <IconButton
        onClick={togglePlay}
        sx={{
          aspectRatio: { xs: "2/2", sm: "1/1" },
          height: { xs: "calc(100% - 50px)", sm: "calc(60%)" },
          minWidth: 0,
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
          <PauseRoundedIcon sx={{ fontSize: { xs: 72, sm: 140 } }} />
        ) : (
          <PlayArrowRoundedIcon sx={{ fontSize: { xs: 72, sm: 140 } }} />
        )}
      </IconButton>
      <Stack width={"100%"} gap={{ xs: 1, sm: 2 }}>
        <Box
          sx={{
            width: "100%",
            height: 10,
            bgcolor: "#DFE0E6",
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
              width: duration ? `${(position / duration) * 100}%` : "0%",
              height: "100%",
              bgcolor: "primary.main",
              borderRadius: 5,
              transition: "width 0.1s linear",
            }}
          />
        </Box>

        <Stack direction="row" justifyContent="space-between" width="100%">
          <Typography variant="body2" fontSize={{ xs: 12, sm: 14 }}>
            {formatTime(position)}
          </Typography>
          <Typography variant="body2" fontSize={{ xs: 12, sm: 14 }}>
            {formatTime(duration)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

const DissplayBox = ({ product }: { product: FetchedProduct }) => {
  const fileObj = product?.files?.[0];

  const fileValue =
    fileObj?.file || fileObj?.title || fileObj?.id || fileObj?.order || "";

  const fileType =
    typeof fileValue === "string" ? getFileFormat(fileValue) : "video";

  return (
    <Stack gap={2}>
      <Typography
        color="secondary"
        fontSize={12}
        sx={{
          color: (theme) =>
            `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }}
      >
        {`تولیدات / ${product.category} / ${product.sub_category}`}
      </Typography>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1.8056",
          position: "relative",
          overflow: "hidden",
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            product.poster && product.poster !== "EMPTY"
              ? `url(${product.poster})`
              : product.files?.length
              ? `url(${product.files[0].file})`
              : "none",
          // backgroundImage: `url(${
          //   fileType == "photo" ? product.file : product.poster
          // })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(3px)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 0,
          },
          "& > *": {
            zIndex: 1,
          },
        }}
      >
        {fileType == "photo" && (
          <ZoomImageModal src={product.files} alt={product.name} />
        )}
        {fileType == "video" && <VideoPlayer product={product} />}
        {fileType == "audio" && <AudioPlayer product={product} />}
      </Box>
    </Stack>
  );
};

export default DissplayBox;
