"use client";

import { Box } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { useEffect, useMemo } from "react";
import ImagesSwiper from "./ImagesSwiper";

type MediaType = "image" | "video" | "audio";
interface MediaPreviewProps {
  isEditing: number | null;
  productImage: File[] | [];
  mediaType: MediaType;
  onDeleteImage: (i: number) => void;
}

const MediaPreviewSwiper = ({
  productImage,
  mediaType,
  isEditing,
  onDeleteImage,
}: MediaPreviewProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const objectUrls = useMemo(() => {
    if (!productImage || productImage.length === 0) return [];

    return productImage.map((file) => {
      if (file instanceof File) {
        return URL.createObjectURL(file);
      }
      return typeof file === "string" ? file : "";
    });
  }, [productImage]);

  const imageUrls = productImage.map((file) => URL.createObjectURL(file));

  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  useEffect(() => {
    return () => {
      objectUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [objectUrls]);

  console.log(productImage, objectUrls);

  if (!productImage.length || !objectUrls.length) {
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
        <ImagesSwiper images={imageUrls} onDeleteImage={onDeleteImage} />
      )}
    </Box>
  );
};
export default MediaPreviewSwiper;
