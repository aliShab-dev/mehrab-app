"use client";

import { useState } from "react";
import {
  AccordionDetails,
  Typography,
  Stack,
  styled,
  Accordion,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toPersianDigits } from "@/util/numberHandler";

const accordionItems = [
  {
    id: "panel1",
    title: "چجوری میتونم سفارشم رو ثبت کنم؟",
    content: `رای ثبت سفارش، کافیه فرم سفارش رو داخل همین صفحه تکمیل کنید و
              جزئیات مورد نظرتون (نوع محتوا، زمان تحویل، توضیحات خاص) رو
              بنویسید. بعد از ارسال فرم، همکاران ما سفارش شما رو بررسی می‌کنن و
              برای هماهنگی نهایی و تأیید جزئیات با شما تماس می‌گیرن. اگر ترجیح
              می‌دید مستقیم با پشتیبانی در ارتباط باشید، می‌تونید با شماره
              ${toPersianDigits("09103533906")} تماس حاصل کنید .`,
  },
  {
    id: "panel2",
    title: "چقدر طول میکشه تا کار آماده بشه؟",
    content: ` زمان تحویل، بستگی به نوع سفارش و حجم کار  داره. معمولاً پروژه‌های کوتاه بین ${toPersianDigits(
      "4"
    )}  تا ${toPersianDigits(
      "6"
    )} روز کاری تحویل داده می‌شن و سفارش‌های بزرگ‌تر یا چندمرحله‌ای، طبق زمان‌بندی توافقی انجام می‌شن.
در هر مرحله، وضعیت سفارش از طریق پیامک یا ایمیل بهتون اطلاع داده می‌شه تا در جریان پیشرفت کار باشید.`,
  },
  {
    id: "panel3",
    title: "میتونم قبل سفارش مشاوره بگیرم؟",
    content: `بله حتماً. ما باور داریم که بهترین نتیجه، با گفت‌وگوی دقیق قبل از شروع به دست میاد.شما می‌تونید از طریق فرم مشاوره ، درخواست مشاوره خود را ثبت کنید تا یکی از کارشناسان ما در زمینه مربوط به درخواست شما با شما تماس بگیره و نیازتون رو دقیق‌تر بررسی کنه.`,
  },
  {
    id: "panel4",
    title: "چه نوع محتوایی تولید میکنید؟",
    content: `فرآیند تولید محتوا در مجموعه‌ی محراب فمیلی در دو بخش تخصصی و مستقل انجام می‌گیرد تا هر پروژه با ساختار حرفه‌ای، تیم مناسب و رویکرد دقیق اجرایی پیش برود.

 تیم رئال (فیلم و تصویر):
این تیم عهده‌دار تولیدات تصویری مبتنی بر واقعیت است؛ از جمله فیلم‌برداری، ساخت تیزرهای گزارشی و تبلیغاتی، تولید بسته‌های خبری و مستندهای کوتاه، ضبط مصاحبه و تولید پادکست‌های تصویری و صوتی.  
کلیه‌ی مراحل از ایده‌پردازی و طراحی سناریو تا فیلم‌برداری، تدوین، صداگذاری و خروجی نهایی، تحت نظارت مستقیم مدیر تولید و بر اساس استانداردهای حرفه‌ای انجام می‌شود.

 تیم گرافیک (طراحی ثابت و متحرک):
این بخش مسئول طراحی و اجرای تولیدات گرافیکی در دو شاخه‌ی اصلی است:

طراحی گرافیک ثابت شامل پوستر، بنر، طرح‌های تبلیغاتی و آثار گرافیکی ویژه‌ی فضای دیجیتال و چاپی.

موشن‌گرافیک و انیمیشن متحرک در قالب‌های متنوع اعم از توضیحی، اطلاع‌رسانی، داستانی، مذهبی و تبلیغاتی، با بهره‌گیری از قالب‌های خلاقانه و استانداردهای بصری روز.

تمامی تولیدات در هر دو تیم، بر اساس نیاز و هدف سفارش‌دهنده، رسانه‌ی مقصد و چارچوب محتوایی پروژه طراحی و اجرا می‌شود تا نتیجه‌ی نهایی، دقیق، حرفه‌ای و قابل ارائه در هر سطح سازمانی باشد.
`,
  },
  {
    id: "panel5",
    title: "قیمت گذاری تون چطوره؟",
    content: `قیمت‌ها بر اساس نوع محتوا، حجم کار و میزان تخصص مورد نیاز محاسبه می‌شن.
ما تلاش می‌کنیم تعرفه‌ها شفاف و منصفانه باشن؛ یعنی قبل از شروع پروژه، برآورد هزینه دقیق بهتون اعلام می‌شه و هیچ هزینه پنهانی در روند کار وجود نداره.برای پروژه‌های مستمر یا سازمانی هم طرح‌های تخفیفی و قراردادی در نظر گرفته شده.در ضمن از طرح های تخفیفی ما جا نمونید  .`,
  },
  {
    id: "panel6",
    title: "پرداخت به چه صورت انجام میشه؟",
    content: `پرداخت از طریق درگاه امن بانکی سایت انجام می‌گیره.
بعد از ثبت سفارش و تأیید جزئیات، لینک پرداخت برای شما ارسال می‌شه. معمولاً بخشی از مبلغ به‌عنوان پیش‌پرداخت و باقی بعد از تأیید نهایی کار تسویه می‌شه.
در صورت نیاز به قرارداد رسمی یا فاکتور سازمانی، این امکان هم وجود داره.`,
  },
];

const CustomAccordion = styled(Accordion)({
  borderRadius: 16,
  boxShadow: "none",
  margin: 0,
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
  },
});

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderRadius: 30,
  border: `1px solid ${theme.palette.secondary.main}`,
  backgroundImage: `linear-gradient(to bottom, #ffffff, #EBECFF)`,
  padding: theme.spacing(1, 3),
  margin: 0,
  "&.Mui-expanded": {
    backgroundImage: `linear-gradient(to bottom, #ffffff, #EBECFF)`,
    boxShadow: `0px 4px 0px -0px ${theme.palette.secondary.main},  0px 8px 5px 1px rgba(0, 0, 0, .14)`,
    padding: theme.spacing(0, 3),
    minHeight: "auto",
    margin: 0,
    marginBottom: 10,
  },
  [theme.breakpoints.up("sm")]: {
    paddingRight: 30,
    "&.Mui-expanded": {
      paddingRight: 10,
    },
  },
  [theme.breakpoints.up("md")]: {
    paddingRight: 50,
    "&.Mui-expanded": {
      paddingRight: 50,
    },
  },
}));

export default function FAQSection() {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Stack gap={2} width={{ xs: "100%", lg: "40%" }}>
      {accordionItems.map(({ id, title, content }) => (
        <CustomAccordion
          key={id}
          expanded={expanded === id}
          onChange={handleChange(id)}
        >
          <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontSize={{ xs: 14, sm: 16 }} fontWeight={500}>
              {title}
            </Typography>
          </CustomAccordionSummary>

          <AccordionDetails>
            <Typography
              whiteSpace={expanded == "panel4" ? "pre-line" : "none"}
              textAlign={"justify"}
              fontSize={{ xs: 12, sm: 14 }}
            >
              {content}
            </Typography>
          </AccordionDetails>
        </CustomAccordion>
      ))}
    </Stack>
  );
}
