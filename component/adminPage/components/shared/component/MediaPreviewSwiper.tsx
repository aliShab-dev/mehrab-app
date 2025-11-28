"use client";

import { Box } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { useEffect, useMemo } from "react";
import ImagesSwiper from "./ImagesSwiper";
import { FileType } from "../../tabs/Graphic";

type MediaType = "image" | "video" | "audio";
interface MediaPreviewProps {
  isEditing: number | null;
  productImage: (File | FileType)[];
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
      return typeof file === "string" ? `${BASE_URL}${file}` : "";
    });
  }, [productImage]);

  console.log(productImage);

  const imageUrls = productImage.map((item) => {
    if (item instanceof File) {
      return URL.createObjectURL(item);
    }

    if (item.file instanceof File) {
      return URL.createObjectURL(item.file);
    }

    if (typeof item.file === "string") {
      return `${BASE_URL}${item.file}`;
    }

    console.warn("Unexpected image object:", item);
    return "";
  });

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
