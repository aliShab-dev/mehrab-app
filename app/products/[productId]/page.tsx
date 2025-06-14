import { products, relatedProduct, restEpisod } from "@/app/lib/products";
import DissplayBox from "@/component/ZoomImage/ZoomImage";
import { Box, Stack, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import Staff from "@/component/product/Staff";
import CardContainerProduct from "@/component/product/CardContainer";

type ProductPageProps = {
  params: {
    productId: string;
  };
};



const staff = [
  {
    name: "کمیل عباس زاهدی",
    position: "کارگردان هنری",
    src: "/komeil.png",
  },
  {
    name: "ریحانه محمدی",
    position: "مدیر منابع انسانی",
    src: "/komeil.png",
  },
  {
    name: "مهدی رضایی",
    position: "برنامه‌نویس ارشد",
    src: "/komeil.png",
  },
  {
    name: "زهرا علی‌پور",
    position: "طراح UI/UX",
    src: "/komeil.png",
  },
  {
    name: "حسین کریمی",
    position: "تحلیل‌گر داده",
    src: "/komeil.png",
  },
  {
    name: "سمانه احمدی",
    position: "مدیر پروژه",
    src: "/komeil.png",
  },
];

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = products.find((p) => p.id == params.productId);
  if (!product) return notFound();
  return (
    <Stack width={"75%"} mt={5} mx={"auto"} mb={15}>
      <DissplayBox product={product} />
      <Stack mt={3} gap={1.5}>
        <Stack direction={"row"}>
          <Stack width={"100%"}>
            <Typography component={"h1"} fontSize={36} fontWeight={700}>
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
                fontSize={20}
                color="textPrimary"
                fontWeight={700}
                lineHeight={1.1}
              >
                1:35:40
              </Typography>
              <Typography fontSize={18} color="textSecondary" lineHeight={1.1}>
                زمان کار
              </Typography>
            </Stack>
            <Stack textAlign={"center"}>
              <Typography
                fontSize={20}
                color="textPrimary"
                fontWeight={700}
                lineHeight={1.1}
              >
                1
              </Typography>
              <Typography fontSize={18} color="textSecondary" lineHeight={1.1}>
                قسمت
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Typography fontSize={20}>{`به سفارش ${product.author}`}</Typography>
        </Stack>
        <Stack width={60}>
          <Box
            bgcolor={"#FFE95C"}
            width={"auto"}
            px={1}
            py={0.6}
            textAlign={"center"}
            borderRadius={3}
          >
            <Typography fontSize={12} fontWeight={700} color="secondary.dark">
              سطح 1
            </Typography>
          </Box>
        </Stack>
        <Stack mt={2}>
          <Typography fontSize={18} color="textSecondary">
            محتوای کار از جمله متن، چگونه رسیدن به ایده، رنگبندی،و...
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={2} mt={8}>
          <Stack width={50} height={50} position={"relative"}>
            <StarRoundedIcon
              sx={{
                position: "absolute",
                top: -15,
                right: -10,
                fontSize: 70,
                color: "primary.main",
                opacity: 0.6,
                rotate: "-10deg",
                zIndex: 10,
              }}
            />
            <GroupsRoundedIcon
              sx={{
                fontSize: 35,
                position: "absolute",
                bottom: 0,
                left: -5,
                color: "secondary.dark",
                zIndex: 20,
              }}
            />
          </Stack>
          <Stack>
            <Typography fontSize={32} fontWeight={700}>
              عوامل
            </Typography>
          </Stack>
        </Stack>

        <Staff staff={staff} />
        <CardContainerProduct label="دیگر قسمت‌ها" cardData={relatedProduct}/>
        <CardContainerProduct label="نمونه‌های دیگر" cardData={restEpisod}/>
      </Stack>
    </Stack>
  );
};

export default ProductPage;
