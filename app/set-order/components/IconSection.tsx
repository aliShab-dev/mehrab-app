import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

const listOfIcons = [
  { title: "پشتیبانی", src: "/back-up.png" },
  { title: "مشاوره رایگان", src: "/consult.png" },
  { title: "تیم خلاق و متخصص", src: "/expert-team.png" },
  { title: "تحویل به موقع و سریع‌تر از انتظار", src: "/delivery.png" },
  { title: "تضمین کیفیت", src: "/quality.png" },
];

const IconSection = () => {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      mt={{ xs: 8, md: 15 }}
      gap={1}
      justifyContent={{ xs: "space-evenly", md: "space-between" }}
      flexWrap="wrap"
    >
      {listOfIcons.map((item) => (
        <Stack
          key={item.title}
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <Box
            width={{ xs: 60, sm: 72, md: 90, lg: 110 }}
            height={{ xs: 60, sm: 72, md: 90, lg: 110 }}
            position={"relative"}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 600px) 60px, 60px"
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Typography fontSize={{ xs: 12, md: 16 }}>{item.title}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default IconSection