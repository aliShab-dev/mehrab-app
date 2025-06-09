import { products } from "@/app/lib/products";
import { Typography } from "@mui/material";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: {
    productId: string;
  };
};

const ProductPage = async ({ params }: ProductPageProps) => {
  console.log(products);
  const product = products.find((p) => p.id == params.productId);
  if (!product) return notFound();
  return (
    <>
      <Typography> {product.name}</Typography>
    </>
  );
};

export default ProductPage;
