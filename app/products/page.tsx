"use client";

import Link from "next/link";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import { alpha, Box, Stack, Typography } from "@mui/material";
import PageHeader from "@/component/pageHeader/PageHeader";
import SelectedCatBtn, {
  Category,
} from "@/component/selectCatBtn/SelectCatBtn";
import { useState } from "react";
import Image from "next/image";

const products = [
  {
    id: "1",
    src: "/book.png",
    name: "موشن برفراز قله‌ها",
    author: "به سفارش آستان قدس رضوی",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "2",
    src: "/orange.png",
    name: "موشن برفراز قله‌ها",
    author: "به سفارش آستان قدس رضوی",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "3",
    src: "/poster.png",
    name: "موشن  قله‌ها",
    author: " آستان قدس رضوی",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "4",
    src: "/book.png",
    name: "موشن برفراز قله‌ها",
    author: "به سفارش آستان قدس رضوی",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "5",
    src: "/orange.png",
    name: " برفراز قله‌ها",
    author: "به  آستان قدس رضوی",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "6",
    src: "/poster.png",
    name: "موشن برفراز قله‌ها",
    author: "به سفارش آستان قدس رضوی",
    category: "موشن گرافی / رئال موشن",
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCat, setSelectedSubCat] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  return (
    <Stack width={"80%"} mx={"auto"} mt={5}>
      <PageHeader Icon={BusinessCenterRoundedIcon} title="تولیدات ما" />

      <Stack width={"50%"} mx={"auto"} mt={3}>
        <SelectedCatBtn
          selectedLevel={selectedLevel}
          selectedSubCat={selectedSubCat}
          selectedCategory={selectedCategory}
          setSelectedLevel={setSelectedLevel}
          setSelectedSubCat={setSelectedSubCat}
          setSelectedCategory={setSelectedCategory}
        />
      </Stack>

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        rowGap={5}
        columnGap={3}
        my={10}
      >
        {products.map((product) => (
          <Box
            flexDirection={"column"}
            sx={{
              width: 280,
              borderRadius: 3,
              backgroundImage: (theme) =>
                `linear-gradient(to bottom, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,
              p: 0.6,
              pb: 1.2,
              cursor: "pointer",
              transition: 'box-shadow .3s ease',
              "&:hover": {
                top: 1,
                boxShadow: theme => `0px 10px 35px -8px ${theme.palette.secondary.main}`
              },
              "&:hover .image-wrapper": {
                filter: "none",
              },
              "&:hover .zoom-image": {
                transform: "scale(1.05) !important",
              },
            }}
          >
            <Box
              className={"image-wrapper"}
              sx={{
                width: "100%",
                aspectRatio: "4/3",
                backgroundColor: "#fff",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                filter: "grayscale(75%)",
                transition: "filter 0.3s ease",
              }}
            >
              <Image
                src={product.src}
                alt="image"
                fill
                className="zoom-image"
                style={{
                  objectFit: "cover",
                  transform: "scale(1)",
                  transition: "transform 0.4s ease",
                }}
              />
            </Box>

            <Box mt={1} position={"relative"}>
              <Typography width={220} color="#fff" fontSize={20} noWrap>
                {product.name}
              </Typography>
              <Typography width={"100%"} color="#FFCE5C" fontSize={14} noWrap>
                {product.author}
              </Typography>
              <Typography
                fontSize={12}
                fontWeight={300}
                width={"100%"}
                sx={{
                  mt: 2,
                  color: (theme) => alpha(theme.palette.primary.main, 0.7),
                }}
                noWrap
              >
                {product.category}
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  top: 1,
                  left: 5,
                  width: 50,
                  height: 25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#FFE95C",
                  borderRadius: 3,
                }}
              >
                <Typography fontSize={12} color="secondary.dark">
                  سطح 1
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
