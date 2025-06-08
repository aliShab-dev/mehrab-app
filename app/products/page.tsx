"use client";

import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import { Stack } from "@mui/material";
import PageHeader from "@/component/pageHeader/PageHeader";
import SelectedCatBtn, {
  Category,
} from "@/component/selectCatBtn/SelectCatBtn";
import { useEffect, useState } from "react";
import Pagination from "@/component/products/Pagination";
import CardContainer from "@/component/products/CardContain";

const products = [
  {
    id: "1",
    src: "/orange.png",
    name: "راز کوه‌های سپید",
    author: "سازمان فرهنگ اسلامی",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "2",
    src: "/book.png",
    name: "طلوع امید",
    author: "کانون پرورش فکری",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "3",
    src: "/poster.png",
    name: "پرواز تا قله",
    author: "خانه مستند انقلاب",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "4",
    src: "/orange.png",
    name: "نبض حیات",
    author: "به سفارش بسیج هنرمندان",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "5",
    src: "/poster.png",
    name: "شوق پرواز",
    author: "مرکز هنرهای دیجیتال",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "6",
    src: "/book.png",
    name: "رهایی از تاریکی",
    author: "به سفارش حوزه هنری",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "7",
    src: "/orange.png",
    name: "روایت قله‌ها",
    author: "موسسه رسانه‌ای افق",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "8",
    src: "/book.png",
    name: "در مسیر نور",
    author: "موسسه فرهنگی کوثر",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "9",
    src: "/poster.png",
    name: "آخرین پناه",
    author: "به سفارش سازمان تبلیغات اسلامی",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "10",
    src: "/orange.png",
    name: "طلوع جاوید",
    author: "موسسه نشر اندیشه",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "11",
    src: "/book.png",
    name: "مسیر روشن",
    author: "خانه موشن تهران",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "12",
    src: "/poster.png",
    name: "صدای کوهستان",
    author: "به سفارش مرکز رسانه انقلاب",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "13",
    src: "/orange.png",
    name: "فراتر از افق",
    author: "آستان قدس رضوی",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "14",
    src: "/book.png",
    name: "بر فراز بیداری",
    author: "سازمان تبلیغات اسلامی",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "15",
    src: "/poster.png",
    name: "انعکاس نور",
    author: "حوزه هنری قم",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "16",
    src: "/orange.png",
    name: "راز قله خاموش",
    author: "مرکز فرهنگی بصیرت",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "17",
    src: "/book.png",
    name: "پنجره رو به آسمان",
    author: "کانون هنری پیام",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "18",
    src: "/poster.png",
    name: "نور در مه",
    author: "موسسه سفیر هنر",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "19",
    src: "/orange.png",
    name: "کوچه‌های بیداری",
    author: "مرکز موشن‌گرافی انقلاب",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "20",
    src: "/book.png",
    name: "افق ناپیدا",
    author: "انجمن تصویرگران ایران",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "21",
    src: "/poster.png",
    name: "روشنای شب",
    author: "موسسه نورافشان",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "22",
    src: "/orange.png",
    name: "به رنگ شبنم",
    author: "موسسه هنر انقلاب",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "23",
    src: "/book.png",
    name: "روایت بیداری",
    author: "حوزه هنری جوان",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "24",
    src: "/poster.png",
    name: "ستاره شمال",
    author: "مرکز فرهنگی افق",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "25",
    src: "/orange.png",
    name: "مسیر ایثار",
    author: "به سفارش صدا و سیما",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "26",
    src: "/book.png",
    name: "افق زنده",
    author: "کانون دانش و رسانه",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "27",
    src: "/poster.png",
    name: "دریچه حقیقت",
    author: "انجمن هنرمندان انقلاب",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "28",
    src: "/orange.png",
    name: "چراغ خاموش",
    author: "موسسه هفت نگاه",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "29",
    src: "/book.png",
    name: "قله ایمان",
    author: "خانه هنر اسلامی",
    category: "موشن گرافی / رئال موشن",
  },
  {
    id: "30",
    src: "/poster.png",
    name: "یاد قله‌ها",
    author: "مرکز رشد هنر انقلاب",
    category: "موشن گرافی / رئال موشن",
  },
];

export default function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCat, setSelectedSubCat] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const currentItems = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedSubCat, selectedLevel]);

  return (
    <Stack width={"80%"} mx={"auto"} mt={5} mb={15}>
      <PageHeader Icon={BusinessCenterRoundedIcon} title="تولیدات ما" />

      <Stack width={"50%"} mx={"auto"} mt={3}>
        <SelectedCatBtn
          selectedLevel={selectedLevel}
          selectedSubCat={selectedSubCat}
          selectedCategory={selectedCategory}
          setSelectedLevel={setSelectedLevel}
          setSelectedSubCat={setSelectedSubCat}
          setSelectedCategory={setSelectedCategory}
        />
      </Stack>

      <CardContainer
        page={page}
        showAll={showAll}
        loading={loading}
        allItems={products}
        currentItems={currentItems}
      />

      <Pagination
        page={page}
        showAll={showAll}
        setShowAll={setShowAll}
        loading={loading}
        setPage={setPage}
        pageCount={pageCount}
      />
    </Stack>
  );
}
