"use client";

import { useState } from "react";
import { Box, Dialog, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ProductType = {
  name: string;
  category: string;
  src: string;
  id: string;
  author: string;
};

const ZoomImageModal = ({ src, alt }: { src: string; alt?: string }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Thumbnail */}
      <Box
        component="img"
        src={src}
        alt={alt || ""}
        sx={{
          py: 1,
          height: "100%",
          width: "auto",
          objectFit: "contain",
          cursor: "zoom-in",
          borderRadius: 2,
        }}
        onClick={() => setOpen(true)}
      />

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
          {/* Close Button */}
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

          {/* Image */}
          <Box
            component="img"
            src={src}
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

const DissplayBox = ({ product }: { product: ProductType }) => {
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
        {`تولیدات/${product.category}/${product.category}`}
      </Typography>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "2.1/1",
          bgcolor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
      >
        <ZoomImageModal src={product.src} alt={product.name} />
      </Box>
    </Stack>
  );
};

export default DissplayBox;
