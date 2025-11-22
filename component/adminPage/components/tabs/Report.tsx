"use client";

import { alpha, Stack, Typography } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import ImageIcon from "@mui/icons-material/Image";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import MovieIcon from "@mui/icons-material/Movie";

const rows: GridRowsProp = [
  {
    id: 1,
    fullName: "محمد رضایی",
    phoneNumber: "09121234567",
    socialMedia: "@mohammadrezaei",
    orderBy: "سفارش اول",
    publication: "اینستاگرام",
    description: "تبلیغ محصول جدید",
    file: "https://www.w3schools.com/html/mov_bbb.mp4", // video
  },
  {
    id: 2,
    fullName: "سارا حسینی",
    phoneNumber: "09129876543",
    socialMedia: "@sarah.h",
    orderBy: "سفارش دوم",
    publication: "تلگرام",
    description: "ارسال پیام تبلیغاتی",
    file: "https://www.w3schools.com/html/horse.mp3", // audio
  },
  {
    id: 3,
    fullName: "علی احمدی",
    phoneNumber: "09123456789",
    socialMedia: "@ali.ahmadi",
    orderBy: "سفارش سوم",
    publication: "اینستاگرام",
    description: "برگزاری کمپین",
    file: "https://www.w3schools.com/w3images/fjords.jpg", // image
  },
  {
    id: 4,
    fullName: "نرگس کریمی",
    phoneNumber: "09122334455",
    socialMedia: "@narges.k",
    orderBy: "سفارش چهارم",
    publication: "آپارات",
    description: "آپلود ویدیو تبلیغاتی",
    file: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 5,
    fullName: "مهدی کاظمی",
    phoneNumber: "09121112233",
    socialMedia: "@mehdi.kazemi",
    orderBy: "سفارش پنجم",
    publication: "اینستاگرام",
    description: "تبلیغ محصول قدیمی",
    file: "https://www.w3schools.com/w3images/lights.jpg",
  },
  {
    id: 6,
    fullName: "ریحانه موسوی",
    phoneNumber: "09124445566",
    socialMedia: "@reyhane.m",
    orderBy: "سفارش ششم",
    publication: "تلگرام",
    description: "ارسال محتوای متنی",
    file: "https://www.w3schools.com/html/horse.mp3",
  },
  {
    id: 7,
    fullName: "حسین جلالی",
    phoneNumber: "09127778899",
    socialMedia: "@hossein.j",
    orderBy: "سفارش هفتم",
    publication: "اینستاگرام",
    description: "طراحی بنر تبلیغاتی",
    file: "https://www.w3schools.com/w3images/fjords.jpg",
  },
  {
    id: 8,
    fullName: "لیلا شاهی",
    phoneNumber: "09123334455",
    socialMedia: "@lila.shahi",
    orderBy: "سفارش هشتم",
    publication: "آپارات",
    description: "آپلود ویدیو آموزشی",
    file: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 9,
    fullName: "رضا ملکی",
    phoneNumber: "09126667788",
    socialMedia: "@reza.maleki",
    orderBy: "سفارش نهم",
    publication: "اینستاگرام",
    description: "تبلیغ رویداد جدید",
    file: "https://www.w3schools.com/w3images/lights.jpg",
  },
  {
    id: 10,
    fullName: "فاطمه حیدری",
    phoneNumber: "09129990011",
    socialMedia: "@fatemeh.h",
    orderBy: "سفارش دهم",
    publication: "تلگرام",
    description: "ارسال پیام تبلیغاتی",
    file: "https://www.w3schools.com/html/horse.mp3",
  },
];


const columns: GridColDef[] = [
  { field: "fullName", headerName: "نام و نام خانوادگی", width: 240 },
  { field: "phoneNumber", headerName: "شماره تماس", width: 200 },
  { field: "socialMedia", headerName: "شبکه اجتماعی", width: 210 },
  { field: "orderBy", headerName: "به سفارش", width: 250 },
  { field: "publication", headerName: "بستر انتشار", width: 240 },
  { field: "description", headerName: "توضیحات", width: 400 },
  {
    field: "file",
    headerName: "فایل",
    width: 300,
    renderCell: (params) => {
      const fileUrl = params.value;
      let IconComponent = null;

      if (fileUrl?.match(/\.(jpg|jpeg|png|gif)$/i)) IconComponent = ImageIcon;
      else if (fileUrl?.match(/\.(mp3|wav|ogg)$/i))
        IconComponent = AudiotrackIcon;
      else if (fileUrl?.match(/\.(mp4|mov|avi)$/i)) IconComponent = MovieIcon;

      return (
        <Stack direction="row" spacing={1} alignItems="center">
          {IconComponent && <IconComponent color="primary" />}
          <Typography
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => fileUrl && window.open(fileUrl, "_blank")}
          >
            {fileUrl?.split("/").pop() || "فایل"}
          </Typography>
        </Stack>
      );
    },
  },
];

const Report = () => {
  return (
    <Stack width={"100%"} height={500}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={(theme) => ({
          border: `2px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
          borderRadius: 2,
          direction: "rtl",
          textAlign: "right",
          "& .MuiDataGrid-columnHeaders": {
            color: theme.palette.secondary.main,
            fontWeight: "bold",
            fontSize: "1rem",
          },
          "& .MuiDataGrid-cell": {
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          },
          "&::-webkit-scrollbar-button": {
            display: "none",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.default,
          },
          "&::-webkit-scrollbar": {
            width: 8,
            height: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 4,
          },
          scrollbarWidth: "thin",
          scrollbarColor: `${alpha(theme.palette.secondary.light, 0.8)} ${
            theme.palette.background.default
          }`,
        })}
      />
    </Stack>
  );
};

export default Report;
