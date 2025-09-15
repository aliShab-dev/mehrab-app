import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import { Stack } from "@mui/material";
import PageHeader from "@/component/pageHeader/PageHeader";
import getCategories from "@/component/adminPage/service/getCat";
import ProductsClient from "./components/PruductsClient";
import { transformCategories } from "../page";

async function fetchCategoriesData() {
  try {
    const res = await getCategories();
    return res;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export default async function ProductsPage() {
  const categories = await fetchCategoriesData();
  const transformedData = transformCategories(categories); // gonna send it to client compnent


  return (
    <Stack width={"80%"} mx={"auto"} mt={5} mb={15}>
      <PageHeader Icon={BusinessCenterRoundedIcon} title="تولیدات ما" />
      <ProductsClient categories={transformedData} />
    </Stack>
  );
}
