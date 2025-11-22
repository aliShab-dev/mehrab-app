import { Stack, Typography } from "@mui/material";
import FAQSection from "./components/FAQSection";
import OrderForm from "./components/OrderForm";
import IconSection from "./components/IconSection";
import DownloadSection from "./components/DownloadSection";

const SetOrder = () => {
  return (
    <Stack width={{ xs: "85%", md: "80%" }} mx={"auto"}>
      <Stack
        component={"section"}
        direction={{ xs: "column", lg: "row" }}
        mt={{ xs: 2, md: 8 }}
        gap={{ xs: 6, md: 5 }}
        justifyContent={"space-between"}
      >
        <Stack gap={{ xs: 2, md: 5 }} width={{ xs: "100%", lg: "55%" }}>
          <Stack gap={{ xs: 1, md: 3 }} width="100%">
            <Typography
              fontSize={{ xs: 14, sm: 16, md: 20, lg: 24 }}
              fontWeight={700}
            >
              توضیح کوتاه در مورد سفارش
            </Typography>
            <Typography
              fontSize={{ xs: 12, sm: 14, md: 16, lg: 18 }}
              width={"100%"}
              flexWrap={"wrap"}
              textAlign={"justify"}
            >
              در محراب فمیلی، هر سفارش یک پروژه‌ی خاص و اختصاصی است؛ چون باور
              داریم هر ایده، مخاطب و هدفی منحصر‌به‌فرد دارد. فرآیند ثبت سفارش
              به‌گونه‌ای طراحی شده تا شما بتوانید دقیقاً همان نتیجه‌ای را دریافت
              کنید که در ذهن دارید. از انتخاب نوع محتوا و سبک تولید گرفته تا
              زمان تحویل و نحوه ارائه، همه‌چیز با شما هماهنگ می‌شود. بعد از ثبت
              فرم سفارش، تیم ما محتوای درخواستی‌تان را بررسی کرده و طی تماس یا
              پیام، جزئیات را با شما نهایی می‌کند. هدف ما این است که تجربه‌ای
              ساده، مطمئن و حرفه‌ای از همکاری در تولید محتوا داشته باشید.
            </Typography>
          </Stack>
          <Stack gap={{ xs: 1, md: 3 }}>
            <Typography
              fontSize={{ xs: 14, sm: 16, md: 20, lg: 24 }}
              fontWeight={700}
            >
              دانلود پی دی اف مقررات و قیمت ها
            </Typography>
            <Typography
              fontSize={{ xs: 12, sm: 14, md: 16, lg: 18 }}
              width={"100%"}
              flexWrap={"wrap"}
              textAlign={"justify"}
            >
              برای شفافیت بیشتر و اطلاع دقیق از روند همکاری، فایل PDF مقررات و
              تعرفه‌های به‌روز محراب فمیلی را آماده کرده‌ایم. در این فایل،
              می‌توانید جزئیات مربوط به مراحل سفارش، شرایط پرداخت، زمان‌بندی
              تولید، قوانین بازبینی و محدوده خدمات ما را مطالعه کنید. دانلود و
              مطالعه‌ی این فایل به شما کمک می‌کند تا پیش از ثبت سفارش، تصویر
              روشنی از فرایند کاری و هزینه‌ها داشته باشید.
            </Typography>

            <DownloadSection />
          </Stack>
        </Stack>
        <FAQSection />
      </Stack>

      <IconSection />

      <OrderForm />
    </Stack>
  );
};

export default SetOrder;
