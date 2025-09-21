import DissplayBox from "@/component/ZoomImage/ZoomImage";
import { Box, Stack, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import Staff from "@/component/product/Staff";
import CardContainerProduct from "@/component/product/CardContainer";
import {
  getProductsByCatId,
  getProductsByProductId,
} from "@/component/adminPage/service/postProduct";
import { FetchedProduct, Subcategory as RawCategories } from "@/types/products";
import getCategories from "@/component/adminPage/service/getCat";

async function fetchProduct(id: string): Promise<FetchedProduct | null> {
  try {
    const product = (await getProductsByProductId(id)) as unknown as FetchedProduct;
    return product || null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}
async function fetchOtherFromSameSubCat(
  id: number
): Promise<FetchedProduct[] | null> {
  try {
    const product = (await getProductsByCatId(id)) as unknown as FetchedProduct[];
    return product || null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return [];
  }
}

async function fetchCategoriesData(): Promise<RawCategories[]> {
  try {
    const res = await getCategories();
    return res;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

type ProductPageParams = {
  params: Promise<{ productId: string }>;
};

const ProductPage = async ({ params }: ProductPageParams) => {
const { productId } = await params;
  const product = await fetchProduct(productId);
  const categories = await fetchCategoriesData();
  const sameSubCat = categories.find(
    (cat) => cat.name == product?.sub_category
  );

  const sameSubCatProduct = sameSubCat
    ? await fetchOtherFromSameSubCat(sameSubCat.id)
    : [];
  const sameWithoutCurrent = product && sameSubCatProduct
    ? sameSubCatProduct.filter((item) => item.id !== product.id)
    : [];

  if (!product) return notFound();

  return (
    <Stack
      width={{ xs: "90%", md: "75%" }}
      mt={{ xs: 1, md: 5 }}
      mx={"auto"}
      mb={15}
    >
      <DissplayBox product={product} />
      <Stack mt={3} gap={1.5}>
        <Stack direction={"row"}>
          <Stack width={"100%"}>
            <Typography
              component={"h1"}
              fontSize={{ xs: 16, sm: 18, md: 24, lg: 36 }}
              fontWeight={700}
            >
              {product.name}
            </Typography>
          </Stack>

          {/* left stack */}
          <Stack
            direction={"row"}
            width={300}
            justifyContent={"space-between"}
            px={1}
          >
            <Stack textAlign={"center"}>
              <Typography
                fontSize={{ xs: 13, sm: 14, md: 16, lg: 20 }}
                color="textPrimary"
                fontWeight={700}
                lineHeight={1.1}
              >
                {product.duration}
              </Typography>
              <Typography
                fontSize={{ xs: 11, sm: 12, md: 14, lg: 18 }}
                color="textSecondary"
                lineHeight={1.1}
              >
                زمان کار
              </Typography>
            </Stack>
            <Stack textAlign={"center"}>
              <Typography
                fontSize={{ xs: 13, sm: 14, md: 16, lg: 20 }}
                color="textPrimary"
                fontWeight={700}
                lineHeight={1.1}
              >
                {product.episode ?? "تک قسمت"}
              </Typography>
              <Typography
                fontSize={{ xs: 11, sm: 12, md: 14, lg: 18 }}
                color="textSecondary"
                lineHeight={1.1}
              >
                قسمت
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Typography
            fontSize={{ xs: 12, sm: 14, md: 18, lg: 20 }}
          >{`به سفارش ${product.company}`}</Typography>
        </Stack>
        <Stack width={60}>
          <Box
            bgcolor={"#FFE95C"}
            width={"auto"}
            px={{ xs: 0.8, md: 1 }}
            py={0.6}
            textAlign={"center"}
            borderRadius={3}
          >
            <Typography
              fontSize={{ xs: 10, md: 12 }}
              fontWeight={700}
              color="secondary.dark"
            >
              سطح {product.level}
            </Typography>
          </Box>
        </Stack>
        <Stack mt={2}>
          <Typography
            fontSize={{ xs: 13, sm: 15, md: 18 }}
            color="textSecondary"
          >
            {product.description}
          </Typography>
        </Stack>

        {!!product?.staff_data?.length && (
          <>
            <Stack direction={"row"} alignItems={"center"} gap={2} mt={8}>
              <Stack width={50} height={50} position={"relative"}>
                <StarRoundedIcon
                  sx={{
                    position: "absolute",
                    top: { xs: -10, sm: -10, md: -15 },
                    right: { xs: 5, sm: 0, md: -10 },
                    fontSize: { xs: 55, sm: 60, md: 70 },
                    color: "primary.main",
                    opacity: 0.6,
                    rotate: "-10deg",
                    zIndex: 10,
                  }}
                />
                <GroupsRoundedIcon
                  sx={{
                    fontSize: { xs: 28, sm: 35 },
                    position: "absolute",
                    bottom: { xs: 5, sm: 0 },
                    left: -5,
                    color: "secondary.dark",
                    zIndex: 20,
                  }}
                />
              </Stack>
              <Stack>
                <Typography
                  fontSize={{ xs: 20, sm: 24, md: 28, lg: 32 }}
                  fontWeight={700}
                >
                  عوامل
                </Typography>
              </Stack>
            </Stack>
            <Staff staff={product.staff_data} />
          </>
        )}
        {/* <CardContainerProduct label="دیگر قسمت‌ها" cardData={relatedProduct} /> */}
        {!!sameWithoutCurrent?.length && (
          <CardContainerProduct
            label="نمونه‌های دیگر"
            cardData={sameWithoutCurrent}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default ProductPage;
