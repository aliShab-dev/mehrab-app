import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import { Stack } from "@mui/material";
import PageHeader from "@/component/pageHeader/PageHeader";
import getCategories from "@/component/adminPage/service/getCat";
import { transformCategories } from "@/util/numberHandler";
import { Categories } from "@/types/categories";
import ProductsClient from "./components/PruductsClient";

export default async function ProductsPage() {
  const categories = await getCategories();
  const transformedData: Categories = transformCategories(categories); 

  return (
    <Stack width={"80%"} mx={"auto"} mt={5} mb={15}>
      <PageHeader Icon={BusinessCenterRoundedIcon} title="تولیدات ما" />
      <ProductsClient categories={transformedData} />
    </Stack>
  );
}
