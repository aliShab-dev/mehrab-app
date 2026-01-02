"use client";

import { Stack } from "@mui/material";
import ButtonMenu from "./ButtonMenu";
import VideoPlayer from "./VideoPlayer";
import { useEffect, useState } from "react";
import { getProductsByCatId } from "@/component/adminPage/service/postProduct";
import { Categories } from "@/types/categories";
import { FileType } from "@/component/adminPage/components/tabs/Graphic";

interface ClientContainerProps {
  categories: Categories;
}

export interface Product {
  category: string;
  files: FileType[];
  company: string;
  created_at: string;
  description: string;
  duration: string;
  episode: number | null;
  file: string;
  id: number;
  is_active: boolean;
  level: string;
  name: string;
  poster: string;
  staff_data: any[];
  sub_category: string;
}

const ClientContainer: React.FC<ClientContainerProps> = ({ categories }) => {
  const [expanded, setExpanded] = useState<string | false>("کلاژ موشن");
  const [selectedSubCat, setSelectedSubCat] = useState<number>(1);
  const [productById, setProductById] = useState<Product[]>([]);

  const selectedProduct = productById.find(
    (product) => product.id == selectedSubCat
  );

  const handleChange = (panel: string) => (event: React.SyntheticEvent) => {
    if (panel == expanded) {
      setExpanded(false);
    } else {
      setExpanded(panel);
    }
  };

  const handleSubCatChange = (id: number) => {
    setSelectedSubCat(id);
  };

  useEffect(() => {
    setProductById([]);
    getProductsByCatId(
      categories
        .find((cat) => cat.categoryId == 1)
        ?.subCatList.find((subCat) => subCat.subCatName == expanded)?.subCatId
    )
      .then((res) => {
        setSelectedSubCat(res[0]?.id);
        setProductById(res);
      })
      .catch((res) => console.log(res));
  }, [expanded]);

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      width="93.4%"
      height="100%"
      mx={"auto"}
      gap={4}
      sx={{ aspectRatio: { xs: "nome", md: "1920/980" } }}
    >
      <ButtonMenu
        productById={productById}
        categories={categories}
        expanded={expanded}
        handleChange={handleChange}
        handleSubCatChange={handleSubCatChange}
        selectedSubCat={selectedSubCat}
      />
      <VideoPlayer
        posterUrl={
          selectedProduct ? `${selectedProduct.poster}` : ""
        }
        selectedProduct={selectedProduct}
        url={selectedProduct ? `${selectedProduct.files[0].file}` : ""}
      />
    </Stack>
  );
};

export default ClientContainer;
