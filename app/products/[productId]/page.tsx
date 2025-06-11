import { products } from "@/app/lib/products";
import DissplayBox from "@/component/ZoomImage/ZoomImage";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: {
    productId: string;
  };
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = products.find((p) => p.id == params.productId);
  if (!product) return notFound();
  return (
    <Stack width={"75%"} mt={5} mx={"auto"} mb={15}>
      <DissplayBox product={product} />
    </Stack>
  );
};

export default ProductPage;
