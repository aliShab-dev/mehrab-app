"use client";

import { ChangeEvent, FC, MouseEvent, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import PageHeader from "@/component/pageHeader/PageHeader";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { toPersianDigits } from "@/util/numberHandler";

type Category = {
  name: string;
  subCat: string[];
  level: number[];
};

type MenuType = "category" | "subCat" | "level" | "";

type TextBoxProps = {
  label: string;
  text: string;
  setText: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: 10,
  boxShadow: `0px 5px 10px -5px ${theme.palette.secondary.main}`,
  margin: 0,
  padding: theme.spacing(1, 7),
  display: "flex",
  position: "relative",
  color: theme.palette.text.primary,
  "& .MuiSvgIcon-root": {
    position: "absolute",
    left: 20,
  },
  "&:hover": {
    boxShadow: `0px 5px 14px -3px ${theme.palette.secondary.main}`,
  },
  [theme.breakpoints.up("xs")]: {
    fontSize: 12,
    width: "100%",
    minWidth: 200,
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: 14,
    width: "100%",
    minWidth: 200,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 20,
    width: "auto",
    minWidth: 200,
  },
}));

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

const TextBox: FC<TextBoxProps> = ({ label, text, setText }) => (
  <Stack
    sx={{
      pl: 0.6,
      py: 1,
      gap: 0.5,
      width: {
        xs: "100%",
        sm: "50%",
        md: "50%",
        lg: "33.33%",
      },
    }}
  >
    <Typography fontSize={{ xs: 13, sm: 15, md: 17 }} variant="subtitle2">
      {label}:
    </Typography>{" "}
    <TextField
      variant="outlined"
      fullWidth
      value={text}
      onChange={setText}
      InputProps={{
        sx: {
          backgroundColor: "#DFE0E6",
          borderRadius: 3,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      }}
    />
  </Stack>
);

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

🔹 تیم رئال (فیلم و تصویر):
این تیم عهده‌دار تولیدات تصویری مبتنی بر واقعیت است؛ از جمله فیلم‌برداری، ساخت تیزرهای گزارشی و تبلیغاتی، تولید بسته‌های خبری و مستندهای کوتاه، ضبط مصاحبه و تولید پادکست‌های تصویری و صوتی.  
کلیه‌ی مراحل از ایده‌پردازی و طراحی سناریو تا فیلم‌برداری، تدوین، صداگذاری و خروجی نهایی، تحت نظارت مستقیم مدیر تولید و بر اساس استانداردهای حرفه‌ای انجام می‌شود.

🔹 تیم گرافیک (طراحی ثابت و متحرک):
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

const listOfIcons = [
  { title: "پشتیبانی", src: "/back-up.png" },
  { title: "مشاوره رایگان", src: "/consult.png" },
  { title: "تیم خلاق و متخصص", src: "/expert-team.png" },
  { title: "تحویل به موقع و سریع‌تر از انتظار", src: "/delivery.png" },
  { title: "تضمین کیفیت", src: "/quality.png" },
];

const categories = [
  {
    name: "موشن گرافی",
    subCat: [
      "کلاژ موشن",
      "کمیک موشن",
      "هندموشن",
      "فلت موشن",
      "اینفوموشن",
      "رئال موشن",
      " لوگوموشن",
      "پوستر موشن",
      " استوری موشن",
    ],
    level: [1, 2, 3],
  },
  {
    name: "فیلم و مستند",
    subCat: [
      "ویدیو کامنت ضبطی",
      "مستند کوتاه",
      "کلیپ",
      "مصاحبه",
      "تیزر گزارشی",
    ],
    level: [1, 2, 3],
  },
  {
    name: "صوت و نریشن",
    subCat: ["نریشن", "صوت"],
    level: [1, 2, 3],
  },
  {
    name: "گرافیک دیزاین",
    subCat: [
      "هویت بصری",
      "لوگو",
      "اینفوگرافیک",
      "پوستر",
      "تایپوگرافی",
      "جلد کتاب",
    ],
    level: [1, 2, 3],
  },
];

const SetOrder = () => {
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCat, setSelectedSubCat] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = useState("");
  const [fields, setFields] = useState<{
    name: string;
    lastName: string;
    phone: string;
    socialMedia: string;
    organName: string;
    placement: string;
    file: File | null;
    description: string;
  }>({
    name: "",
    lastName: "",
    phone: "",
    socialMedia: "",
    organName: "",
    placement: "",
    file: null,
    description: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFields((prev) => ({ ...prev, file }));
    }
  };

  const handleTextBox =
    (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleOpenMenu = (
    event: MouseEvent<HTMLButtonElement>,
    type: MenuType
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuType("");
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubCat(null);
    setSelectedLevel(null);
    handleClose();
  };

  const handleSelectSubCat = (subCat: string) => {
    setSelectedSubCat(subCat);
    handleClose();
  };

  const handleSelectLevel = (level: number) => {
    setSelectedLevel(level);
    handleClose();
  };

  const handleDownload = () => {
    const imageUrl = "/rules.jpg"; // Replace with your image URL

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "قوانین خانواده محراب"; // Filename for the downloaded image
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Stack width={{ xs: "85%", md: "80%" }} mx={"auto"}>
      <Stack
        component={"section"}
        direction={{ xs: "column", lg: "row" }}
        mt={{ xs: 5, md: 15 }}
        gap={{ xs: 6, md: 5 }}
        justifyContent={"space-between"}
      >
        <Stack gap={{ xs: 2, md: 5 }} width={{ xs: "100%", lg: "60%" }}>
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

            <Stack
              sx={{
                mt: { xs: 3, lg: 1 },
                position: "relative",
                bgcolor: (theme) => alpha(theme.palette.svgColor.main, 0.4),
                borderRadius: 3,
                width: "100%",
                height: "auto",
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography
                color="secondary.dark"
                fontSize={{ xs: 14, sm: 16, md: 28 }}
                sx={{ my: "auto", ml: 6 }}
              >
                دانلود پی دی اف مقررات و قیمت ها
              </Typography>
              <Box
                onClick={handleDownload}
                bgcolor={"#fff"}
                sx={{
                  position: "absolute",
                  top: -20,
                  left: 1,
                  color: (theme) => theme.palette.primary.main,
                  rotate: "-20deg",
                  width: { xs: 55, sm: 60, md: 65, lg: 72 },
                  height: { xs: 80, sm: 100, md: 105 },
                  borderRadius: 4,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: 3,
                  transition: "rotate .5s ease",
                  cursor: "pointer",
                  "&:hover": {
                    color: (theme) => theme.palette.primary.dark,
                    rotate: "-15deg",
                    transition: "rotate .5s ease",
                    boxShadow: 5,
                  },
                }}
              >
                <DownloadRoundedIcon
                  sx={{ fontSize: { xs: 72, sm: 80, md: 92 } }}
                />
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={2} width={{ xs: "100%", lg: "40%" }}>
          {accordionItems.map(({ id, title, content }) => (
            <CustomAccordion
              key={id}
              expanded={expanded === id}
              onChange={handleChange(id)}
            >
              <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontSize={{ xs: 13, sm: 16, md: 18 }}>
                  {title}
                </Typography>
              </CustomAccordionSummary>
              <AccordionDetails>
                <Typography
                  fontSize={{ xs: 12, md: 14 }}
                  fontWeight={300}
                  sx={{ whiteSpace: id == "panel4" ? "pre-line" : 'none'}}
                >
                  {content}
                </Typography>
              </AccordionDetails>
            </CustomAccordion>
          ))}
        </Stack>
      </Stack>

      <Stack
        direction={"row"}
        width={"100%"}
        mt={{ xs: 8, md: 15 }}
        gap={1}
        justifyContent={{ xs: "space-evenly", md: "space-between" }}
        flexWrap="wrap"
      >
        {listOfIcons.map((item) => (
          <Stack
            key={item.title}
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <Box
              width={{ xs: 60, sm: 72, md: 90, lg: 110 }}
              height={{ xs: 60, sm: 72, md: 90, lg: 110 }}
              position={"relative"}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 600px) 60px, 60px"
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Typography fontSize={{ xs: 12, md: 16 }}>{item.title}</Typography>
          </Stack>
        ))}
      </Stack>

      <Stack
        mt={{ xs: 8, md: 15 }}
        width={{ xs: "100%", sm: "85%", md: "78%" }}
        mx={"auto"}
        mb={20}
      >
        <PageHeader Icon={DescriptionRoundedIcon} title="فرم سفارش دادن" />
        <Stack mb={3} gap={1}>
          <Typography>انتخاب کنید:</Typography>
          <Stack
            direction="row"
            gap={1}
            width={"100%"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            <CustomButton onClick={(e) => handleOpenMenu(e, "category")}>
              {selectedCategory ? selectedCategory.name : "دسته بندی"}
              <ExpandMoreIcon />
            </CustomButton>

            <CustomButton
              onClick={(e) => handleOpenMenu(e, "level")}
              disabled={!selectedCategory}
            >
              {selectedLevel !== null ? `سطح ${selectedLevel}` : "سطح"}
              <ExpandMoreIcon />
            </CustomButton>

            <CustomButton
              onClick={(e) => handleOpenMenu(e, "subCat")}
              disabled={!selectedCategory}
            >
              <Typography
                fontSize={{ xs: 12, sm: 14, md: 20 }}
                width={"100%"}
                noWrap
              >
                {selectedSubCat ?? "سبک"}
              </Typography>
              <ExpandMoreIcon />
            </CustomButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuType === "category" &&
                categories.map((cat) => (
                  <MenuItem
                    key={cat.name}
                    selected={selectedCategory?.name === cat.name}
                    onClick={() => handleSelectCategory(cat)}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 3,
                      fontSize: 18,
                      "&.Mui-selected": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.2),
                      },
                    }}
                  >
                    {cat.name}
                  </MenuItem>
                ))}

              {menuType === "subCat" &&
                selectedCategory?.subCat.map((style) => (
                  <MenuItem
                    key={style}
                    selected={selectedSubCat === style}
                    onClick={() => {
                      handleSelectSubCat(style);
                    }}
                  >
                    {style}
                  </MenuItem>
                ))}

              {menuType === "level" &&
                selectedCategory?.level.map((level) => (
                  <MenuItem
                    key={level}
                    selected={selectedLevel == level}
                    onClick={() => {
                      handleSelectLevel(level);
                    }}
                  >
                    سطح {level}
                  </MenuItem>
                ))}
            </Menu>
          </Stack>
        </Stack>
        <Stack direction="row" flexWrap="wrap" width="100%">
          <TextBox
            label="نام"
            text={fields.name}
            setText={handleTextBox("name")}
          />
          <TextBox
            label="نام خانوادگی"
            text={fields.lastName}
            setText={handleTextBox("lastName")}
          />
          <TextBox
            label="شماره تماس"
            text={fields.phone}
            setText={handleTextBox("phone")}
          />
          <TextBox
            label="فضای مجازی"
            text={fields.socialMedia}
            setText={handleTextBox("socialMedia")}
          />
          <TextBox
            label="به سفارش"
            text={fields.organName}
            setText={handleTextBox("organName")}
          />
          <TextBox
            label="بستر انتشار"
            text={fields.placement}
            setText={handleTextBox("placement")}
          />
          <Stack width={"100%"} gap={1}>
            <Stack gap={0.5}>
              <Typography variant="subtitle2">ارسال فایل نمونه:</Typography>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={handleFileChange}
              />
              <TextField
                variant="outlined"
                fullWidth
                minRows={6}
                value={fields.file?.name || ""}
                onClick={handleFileClick}
                placeholder="برای انتخاب فایل کلیک کنید"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" sx={{ color: "#fff" }}>
                        <UploadFileRoundedIcon fontSize="large" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: "#DFE0E6",
                    borderRadius: 3,
                    cursor: "pointer",
                    "& input": {
                      cursor: "pointer",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  },
                }}
              />
            </Stack>
            <Stack gap={0.5}>
              <Typography variant="subtitle2">توضیحات:</Typography>
              <TextField
                variant="outlined"
                multiline
                fullWidth
                value={fields.description}
                onChange={handleTextBox("description")}
                InputProps={{
                  sx: {
                    height: 200,
                    backgroundColor: "#DFE0E6",
                    borderRadius: 3,
                    alignItems: "flex-start", // aligns content to top
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& .MuiInputBase-inputMultiline": {
                      padding: "8px", // or `0` if you want zero padding
                      height: "100%", // fills parent height
                      boxSizing: "border-box", // ensures height works well
                      lineHeight: 1.5,
                    },
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack
            width={280}
            mx={"auto"}
            mt={2}
            gap={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="قوانین را مطالعه کرده ام و پذیرفته ام"
              sx={{ mr: -1.8 }}
              slotProps={{
                typography: {
                  fontSize: { xs: 13, sm: 16, md: 18 },
                  fontWeight: 500,
                },
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{
                color: "#fff",
                fontSize: 22,
                borderRadius: 3,
                px: 5,
                py: 1,
              }}
            >
              ثبت و ارسال
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SetOrder;
