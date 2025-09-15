"use client";

import { alpha, Box, Skeleton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/component/adminPage/components/tabs/MotionGraphy";

type CardContainer = {
  currentItems: Product[];
  allItems: Product[];
  page: number;
  loading: boolean;
  showAll: boolean;
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const CardContainer = ({
  currentItems,
  page,
  loading,
  showAll,
  allItems,
}: CardContainer) => {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <motion.div
      key={showAll ? "all" : `page-${page}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
        gap: "24px 12px",
        marginTop: "40px",
        marginBottom: "20px",
        justifyContent: "start",
      }}
    >
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 280,
                height: 310,
                borderRadius: 3,
                bgcolor: "grey.200",
                p: 0.6,
                pb: 1.2,
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                sx={{ aspectRatio: "4/3", borderRadius: 3, height: 202 }}
              />
              <Skeleton
                animation={"wave"}
                width="80%"
                height={30}
                sx={{ mt: 1 }}
              />
              <Skeleton animation={"wave"} width="60%" height={20} />
              <Skeleton
                animation={"wave"}
                width="65%"
                height={15}
                sx={{ mt: 2 }}
              />
            </Box>
          ))
        : (showAll ? allItems : currentItems).map((product, index) => (
            <motion.div
              key={product.id || index}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                flex: "1 1 280px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                flexDirection={"column"}
                component={"a"}
                onClick={() => router.push(`/products/${product.id}`)}
                sx={{
                  width: 280,
                  borderRadius: 3,
                  backgroundImage: (theme) =>
                    `linear-gradient(to bottom, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,
                  p: 0.6,
                  pb: 1.2,
                  cursor: "pointer",
                  transition: "box-shadow .3s ease",
                  "&:hover": {
                    top: 1,
                    boxShadow: (theme) =>
                      `0px 10px 35px -8px ${theme.palette.secondary.main}`,
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
                    src={product.poster ? `${BASE_URL}${product.poster}`: `${BASE_URL}${product.file}`}
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
                  <Typography
                    width={"100%"}
                    color="#FFCE5C"
                    fontSize={14}
                    noWrap
                  >
                    {product.company}
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
                      سطح {product.level}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
    </motion.div>
  );
};

export default CardContainer;
