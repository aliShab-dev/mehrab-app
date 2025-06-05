"use client";

import Link from "next/link";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import { Stack } from "@mui/material";
import PageHeader from "@/component/pageHeader/PageHeader";
import SelectedCatBtn, {
  Category,
} from "@/component/selectCatBtn/SelectCatBtn";
import { useState } from "react";

const products = [
  { id: "1", name: "Product One" },
  { id: "2", name: "Product Two" },
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

      <Stack width={'50%'} mx={'auto'} mt={3}>
        <SelectedCatBtn
          selectedLevel={selectedLevel}
          selectedSubCat={selectedSubCat}
          selectedCategory={selectedCategory}
          setSelectedLevel={setSelectedLevel}
          setSelectedSubCat={setSelectedSubCat}
          setSelectedCategory={setSelectedCategory}
        />
      </Stack>

      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </li>
      ))}
    </Stack>
  );
}
