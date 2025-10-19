"use client";

import CardContainer from "@/component/products/CardContain";
import SelectedCatBtn from "@/component/selectCatBtn/SelectCatBtn";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Pagination from "@/component/products/Pagination";
// import { Categories, Category, SubCategory } from "@/app/page";
import { getProductsByCatId } from "@/component/adminPage/service/postProduct";
// import { Product } from "@/component/adminPage/components/tabs/MotionGraphy";
import { Categories, Category, SubCategory } from "@/types/categories";
import { Product } from "@/types/products";

interface ProductsClientProps {
  categories: Categories;
}

const ProductsClient: React.FC<ProductsClientProps> = ({ categories }) => {
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCat, setSelectedSubCat] = useState<SubCategory | null>(
    null
  );
  const [selectedLevel, setSelectedLevel] = useState<number | null>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const currentItems = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedSubCat, selectedLevel]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategory(categories[0]);
    } else {
      setSelectedCategory(null);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory && selectedCategory.subCatList && selectedCategory.subCatList.length > 0) {
      setSelectedSubCat(selectedCategory.subCatList[0]);
    } else {
      setSelectedSubCat(null);
    }
    setSelectedLevel(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCat) {
      setProducts([]);
      setLoading(true);
      getProductsByCatId(selectedSubCat.subCatId)
        .then((res) => {
          setProducts(res);
          setLoading(false);
        })
        .catch((res) => console.log(res));
    }
  }, [selectedSubCat]);

  return (
    <Stack>
      <Stack mx={"auto"} mt={3}>
        <SelectedCatBtn
          categories={categories}
          selectedLevel={selectedLevel}
          selectedSubCat={selectedSubCat}
          selectedCategory={selectedCategory}
          setSelectedLevel={setSelectedLevel}
          setSelectedSubCat={setSelectedSubCat}
          setSelectedCategory={setSelectedCategory}
        />
      </Stack>

      <CardContainer
        page={page}
        showAll={showAll}
        loading={loading}
        allItems={products}
        currentItems={currentItems}
      />

      <Pagination
        page={page}
        showAll={showAll}
        setShowAll={setShowAll}
        loading={loading}
        setPage={setPage}
        pageCount={pageCount}
      />
    </Stack>
  );
};

export default ProductsClient;
