import { Avatar, Box } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import ReactPlayer from "react-player";
import { useEffect, useMemo } from "react";

type MediaType = "image" | "video" | "audio";
interface MediaPreviewProps {
  productImage: File | null;
  mediaType: MediaType;
}

const MediaPreview = ({ productImage, mediaType }: MediaPreviewProps) => {
  console.log(productImage);
  const objectUrl = useMemo(() => {
    if (productImage) {
      return URL.createObjectURL(productImage);
    }
    return null;
  }, [productImage]);

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
          src={objectUrl} // use the memoized object URL here!
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
          url={objectUrl} // use the memoized object URL here!
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
