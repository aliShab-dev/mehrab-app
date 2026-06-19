import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import { Stack } from "@mui/material";
import PageHeader from "@/component/pageHeader/PageHeader";
import getCategories from "@/component/adminPage/service/getCat";
import ProductsClient from "./components/PruductsClient";
import { transformCategories } from "@/util/numberHandler";
import { Categories } from "@/types/categories";

export async function generateMetadata() {
  const categories = await getCategories();
  const transformedCategories = categories.map((cat) => cat.name);

  return {
    title: "تولیدات ما | استودیو محراب",
    description:
      "مشاهده دسته‌بندی‌های محصولات و خدمات رسانه‌ای و هنری استودیو محراب. هر دسته شامل تولیدات اختصاصی و با کیفیت است.",
    keywords: transformedCategories,
    authors: [{ name: "استودیو محراب", url: "https://mehrabfamily.ir" }],
    publisher: "استودیو محراب",
    creator: "استودیو محراب",
  };
}
export default async function ProductsPage() {
  const categories = await getCategories();
  const transformedData: Categories = transformCategories(categories);

  const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "تولیدات ما | استودیو محراب",
    url: "https://mehrabfamily.ir/products",
    itemListElement: Array.isArray(categories)
      ? categories.map((cat, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: cat?.name || "",
        }))
      : [],
  };

  console.log(categories);

  return (
    <Stack width={"80%"} mx={"auto"} mt={5} mb={15}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
      <PageHeader Icon={BusinessCenterRoundedIcon} title="تولیدات ما" />
      <ProductsClient categories={transformedData} />
    </Stack>
  );
}
