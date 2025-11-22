"use client";

import { alpha, Box, Stack, Typography } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const DownloadSection = () => {
  const handleDownload = () => {
    const imageUrl = "/rules.jpg";

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "قوانین خانواده محراب";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Stack
      sx={{
        mt: { xs: 3, lg: 1 },
        position: "relative",
        bgcolor: (theme) => alpha(theme.palette.svgColor.main, 0.4),
        borderRadius: 3,
        width: "100%",
        height: "auto",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography
        color="secondary.dark"
        fontSize={{ xs: 14, sm: 16, md: 28 }}
        sx={{ my: "auto", ml: 6 }}
      >
        دانلود پی دی اف مقررات و قیمت ها
      </Typography>
      <Box
        onClick={handleDownload}
        bgcolor={"#fff"}
        sx={{
          position: "absolute",
          top: -20,
          left: 1,
          color: (theme) => theme.palette.primary.main,
          rotate: "-20deg",
          width: { xs: 55, sm: 60, md: 65, lg: 72 },
          height: { xs: 80, sm: 100, md: 105 },
          borderRadius: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 3,
          transition: "rotate .5s ease",
          cursor: "pointer",
          "&:hover": {
            color: (theme) => theme.palette.primary.dark,
            rotate: "-15deg",
            transition: "rotate .5s ease",
            boxShadow: 5,
          },
        }}
      >
        <DownloadRoundedIcon sx={{ fontSize: { xs: 72, sm: 80, md: 92 } }} />
      </Box>
    </Stack>
  );
};

export default DownloadSection