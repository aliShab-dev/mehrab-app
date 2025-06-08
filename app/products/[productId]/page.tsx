import { notFound } from "next/navigation";

type ProductPageType ={
    productId: string
}


const ProductPage = async ({productId}: ProductPageType) => {
//   if (!product) return notFound();
    return(
        <>
        </>
    )
}

export default ProductPage