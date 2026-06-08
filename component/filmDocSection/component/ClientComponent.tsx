"use client";

import { Box, Stack, Tab, Tabs } from "@mui/material";
import VideoSwiper from "./VideoSwiper";
import { Categories } from "@/types/categories";
import { useEffect, useState } from "react";
import { getProductsByCatId } from "@/component/adminPage/service/postProduct";
import { Product } from "@/component/adminPage/components/tabs/MotionGraphy";

interface ClientContainerProps {
  categories: Categories;
}

const ClientContainer: React.FC<ClientContainerProps> = ({ categories }) => {
  const [listOfVideo, setListOfVideo] = useState<Product[]>([]);
  const [subCategories, setSubCategories] = useState(
    categories.find((cat) => cat.categoryId === 2)?.subCatList || [],
  );

  const [selectedCategory, setSeletedCategory] = useState<number | null>(
    subCategories[0]?.subCatId || null,
  );

  useEffect(() => {
    if (subCategories.length > 0 && selectedCategory === null) {
      setSeletedCategory(subCategories[0].subCatId);
    }
  }, [subCategories, selectedCategory]);

  useEffect(() => {
    setSubCategories(
      categories.find((cat) => cat.categoryId === 2)?.subCatList || [],
    );
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      setListOfVideo([]);
      getProductsByCatId(selectedCategory)
        .then((res) => {
          setListOfVideo(res);
        })
        .catch((res) => console.log(res));
    }
  }, [selectedCategory]);

  if (!subCategories || subCategories.length === 0) {
    return <div>Loading tabs...</div>;
  }

  console.log(subCategories);

  return (
    <Stack
      width="100%"
      height="auto"
      position="relative"
      alignItems="center"
      bgcolor={"primary.main"}
      borderRadius={"0px 0px 24px 0px"}
    >
      <Box
        width={{ xs: "95%", sm: "75%", md: "70%" }}
        mt={-6}
        bgcolor="primary.main"
        px={{ xs: 1, sm: 3, lg: 3 }}
        py={{ xs: 1, sm: 1.2, md: 1.8 }}
        borderRadius="16px 16px 0px 0px"
      >
        <Box
          bgcolor="#fff"
          px={{ xs: 0, sm: 1.8, md: 1.2 }}
          py={1}
          borderRadius={3}
          width="100%"
          overflow="hidden"
        >
          <Tabs
            value={selectedCategory}
            onChange={(_event: React.SyntheticEvent, newValue: number) =>
              setSeletedCategory(newValue)
            }
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            slotProps={{ indicator: { style: { display: "none" } } }}
            sx={{
              "&.MuiTabs-root": {
                minHeight: 0,
              },
              "& .MuiTabs-flexContainer": {
                pr: { xs: 31, sm: 20, md: 10, lg: 0 },
                justifyContent: "center",
              },
              "& .MuiTab-root": {
                marginInlineStart: 1,
                px: { xs: 1, sm: 1.2 },
                py: 0.5,
                fontSize: { xs: 12, sm: 16, md: 20, lg: 22 },
                borderRadius: 2,
                textTransform: "none",
                minHeight: "0px",
                color: (theme) => theme.palette.text.primary,
              },
              "& .Mui-selected": {
                bgcolor: "secondary.main",
                color: "#fff !important",
                borderRadius: 2,
              },
            }}
          >
            {subCategories?.map((cat) => (
              <Tab
                key={cat.subCatId}
                value={cat.subCatId}
                label={cat.subCatName}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      <VideoSwiper videoList={listOfVideo} />
    </Stack>
  );
};

export default ClientContainer;
