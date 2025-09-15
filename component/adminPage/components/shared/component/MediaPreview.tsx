"use client";

import { Avatar, Box } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import ReactPlayer from "react-player";
import { useEffect, useMemo } from "react";

type MediaType = "image" | "video" | "audio";
interface MediaPreviewProps {
  isEditing: number | null;
  productImage: File | null;
  mediaType: MediaType;
}

const MediaPreview = ({
  productImage,
  mediaType,
  isEditing,
}: MediaPreviewProps) => {
  const BASE_URL = "http://127.0.0.1:8000";
const objectUrl = useMemo(() => {
  if (typeof isEditing === "number" && typeof productImage === "string") {
    return `${BASE_URL}${productImage}`;
  }
  else if (isEditing === null && productImage instanceof File) {
    return URL.createObjectURL(productImage);
  }
  return null;
}, [productImage, isEditing]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  if (!productImage || !objectUrl) {
    return (
      <Box
        sx={{
          height: 300,
          aspectRatio: "16/9",
          borderRadius: 1,
          overflow: "hidden",
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageNotSupportedIcon sx={{ fontSize: 48, color: "#aaa" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: 300,
        aspectRatio: "16/9",
        borderRadius: 1,
        overflow: "hidden",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {mediaType === "image" && (
        <Avatar
          src={objectUrl}
          variant="rounded"
          alt="Media"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
      )}

      {mediaType === "video" && (
        <ReactPlayer
          url={objectUrl}
          controls
          width="100%"
          height="100%"
          style={{ borderRadius: 8 }}
        />
      )}

      {mediaType === "audio" && (
        <audio controls style={{ width: "100%" }} key={objectUrl}>
          <source src={objectUrl} type={productImage.type || "audio/mpeg"} />
          مرورگر شما از تگ صوت پشتیبانی نمی‌کند.
        </audio>
      )}
    </Box>
  );
};
export default MediaPreview;
