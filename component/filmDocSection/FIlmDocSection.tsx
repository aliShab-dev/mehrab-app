"use client";

import { Stack } from "@mui/material";
import SectionHeader from "../sectionHeader/SectionHeader";
import { Categories } from "@/types/categories";
import { Suspense } from "react";
import ClientContainer from "./component/ClientComponent";

interface FilmDocSectionProps {
  categories: Categories;
}

const FilmDocSection: React.FC<FilmDocSectionProps> = ({ categories }) => {
  return (
    <Stack
      height={"auto"}
      width={"100%"}
      pt={12}
      gap={10}
      sx={{ overflowX: "hidden", overflowY: "clip" }}
    >
      <Stack width={{ xs: "95%", md: "80%" }} mx="auto">
        <SectionHeader
          backIcon={{
            alt: "Film-document-background-image",
            src: "/PolygonFilm.png",
            width: { xs: 45, sm: 50, md: 60, lg: 65 },
            height: { xs: 45, sm: 50, md: 60, lg: 65 },
            position: {
              xs: { top: -23, left: 7 },
              sm: { top: -25, left: 5 },
              md: { top: -30, left: 5 },
              lg: { top: -35, left: 5 },
            },
            style: { transform: "rotate(-15deg)" },
          }}
          frontIcon={{
            alt: "Film-document-image",
            src: "/cameraFilm.png",
          }}
          title="برترین‌های فیلم و مستند"
        />
      </Stack>

      <Suspense fallback={<div>درحال بارگزاری..</div>}>
        <ClientContainer categories={categories} />
      </Suspense>
    </Stack>
  );
};

export default FilmDocSection;
