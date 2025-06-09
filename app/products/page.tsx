"use client";

import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import { Stack } from "@mui/material";
import PageHeader from "@/component/pageHeader/PageHeader";
import SelectedCatBtn, {
  Category,
} from "@/component/selectCatBtn/SelectCatBtn";
import { useEffect, useState } from "react";
import Pagination from "@/component/products/Pagination";
import CardContainer from "@/component/products/CardContain";
import { products } from "../lib/products";



export default function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCat, setSelectedSubCat] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
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

  return (
    <Stack width={"80%"} mx={"auto"} mt={5} mb={15}>
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
}
