"use client";

import { alpha, styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import React from "react";
import {
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Categories } from "@/types/categories";
import { Product } from "./ClientContainer";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  width: "100%",
  paddingRight: 0,
  backgroundColor: "rgba(0, 0, 0, .00)",
  flexDirection: "row-reverse",
  padding: 0,
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    margin: 0,
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1, 0),
}));

type headerButtonType = {
  expanded: string | false;
  name: string;
};

const HeaderButton = ({ expanded, name }: headerButtonType) => (
  <Button
    component="div"
    disableRipple
    fullWidth
    sx={{
      color: (theme) => theme.palette.primary.main,
      border:
        expanded == name
          ? (theme) => `1px solid ${theme.palette.secondary.main}`
          : "none",
      borderRadius: 4.5,
      boxShadow:
        expanded == name
          ? (theme) =>
              `0px 2px 10px 0px ${alpha(theme.palette.secondary.main, 0.3)}`
          : "none",
      pr: expanded == name ? 1.1 : 1,
      py: 0.7,
      "&:hover": {
        background: "none",
      },
    }}
  >
    <Stack
      direction={"row"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"start"}
      gap={1.5}
    >
      <Stack position={"relative"}>
        <Box
          sx={{
            position: "relative",
            width:
              expanded === name
                ? { xs: 35, sm: 45, md: 38, lg: 42 }
                : { xs: 40, sm: 45, md: 45, lg: 52 },
            height:
              expanded === name
                ? { xs: 36, sm: 40, md: 45, lg: 50 }
                : { xs: 44, sm: 48, md: 50, lg: 50 },
          }}
        >
          <Image
            src={expanded === name ? "/selected-folder.png" : "/Folder.png"}
            alt={expanded === name ? "selected-folder-icon" : "folder-icon"}
            fill
            sizes="(max-width: 600px) 35px, 40px"
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: { xs: 20, sm: 25, md: 23, lg: 25 },
            height: { xs: 20, sm: 22, md: 23, lg: 25 },
            top:
              expanded === name
                ? { xs: 10, sm: 11, md: 13, lg: 15 }
                : { xs: 14, sm: 15, md: 16, lg: 15 },
            right:
              expanded === name
                ? { xs: 8, sm: 11, md: 8, lg: 10 }
                : { xs: 11, sm: 12, md: 12, lg: 14 },
          }}
        >
          <Image
            src={expanded === name ? "/selected-Union.png" : "/Union.png"}
            alt={expanded === name ? "selected-Union-icon" : "Union-icon"}
            fill
            sizes="(max-width: 600px) 20px, 20px"
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Stack>
      <Typography
        fontSize={{ xs: 15, sm: 16, md: 18, lg: 20 }}
        fontWeight={500}
        sx={(theme) => ({
          color:
            expanded === name
              ? theme.palette.primary.main
              : theme.palette.text.primary,
        })}
      >
        {name}
      </Typography>
    </Stack>
  </Button>
);

type SubCat = { id: number; name: string };

const motionCats = [
  "کلاژ موشن",
  "کمیک موشن",
  "هندموشن",
  "فلت موشن",
  "اینفوموشن",
  "رئال موشن",
  " لوگوموشن",
  "پوستر موشن",
  " استوری موشن",
];

interface ButtonMenuProps {
  BASE_URL: string | undefined;
  productById: Product[];
  categories: Categories;
  expanded: string | false;
  selectedSubCat: number;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, expanded: boolean) => void;
  handleSubCatChange: (id: number) => void;
}

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  BASE_URL,
  productById,
  categories,
  expanded,
  selectedSubCat,
  handleChange,
  handleSubCatChange,
}) => {
  return (
    <Stack
      width={{ xs: "100%", md: 300 }}
      height={{ xs: 400, md: "100%" }}
      overflow="hidden"
      pr={1}
      sx={(theme) => ({
        overflowY: "auto",
        direction: "ltr",
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        pt: 2,
        [theme.breakpoints.up("lg")]: {
          borderTop: "none",
          pt: 0,
        },
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-track": {
          background: `linear-gradient(to bottom, transparent 0%, #E9E9E9 0%, #E9E9E9 100%, transparent 100%)`,
          borderRadius: 2,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.secondary.light,
          borderRadius: 2,
        },
        "&::-webkit-scrollbar-button": { display: "none" },
      })}
    >
      {motionCats.map((cat, index) => (
        <Accordion
          key={cat}
          expanded={expanded === cat}
          onChange={handleChange(cat)}
          sx={{
            width: "100%",
            direction: "rtl",
            mb: index === cat.length - 1 || expanded === cat ? 0 : 3.8,
          }}
        >
          <AccordionSummary>
            <HeaderButton key={cat} expanded={expanded} name={cat} />
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              mt={0.6}
              direction={"row"}
              justifyContent={"space-between"}
              gap={0.8}
              width={"90%"}
            >
              {productById.length === 0
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Button
                      key={`skeleton-${index}`}
                      fullWidth
                      sx={{ px: 0, py: 0.3 }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        width="100%"
                        gap={1}
                        sx={{
                          position: "relative",
                          cursor: "pointer",
                          aspectRatio: "1920 / 1080",
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height="100%"
                          sx={{
                            borderRadius: 2,
                          }}
                        />
                        <Skeleton
                          variant="text"
                          width={55}
                          height={16}
                          sx={{
                            position: "absolute",
                            bottom: -14,
                            right: 5,
                          }}
                        />
                      </Stack>
                    </Button>
                  ))
                : productById.slice(0, 3).map((subCat) => {
                    const imageSrc = subCat?.poster
                      ? `${BASE_URL}${subCat.poster}`
                      : "/default-poster.png";

                    return (
                      <Button
                        key={subCat.id}
                        fullWidth
                        onClick={() => handleSubCatChange(subCat.id)}
                        sx={{ px: 0, py: 0.3 }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          width="100%"
                          sx={{
                            position: "relative",
                            cursor: "pointer",
                            aspectRatio: "1920 / 1080",
                          }}
                        >
                          <Image
                            src={imageSrc}
                            alt={`${subCat.id}-${subCat.name}`}
                            fill
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 2,
                              objectFit: "cover",
                              filter:
                                subCat.id === selectedSubCat
                                  ? "none"
                                  : "grayscale(100%)",
                            }}
                          />
                          <Typography
                            fontSize={11}
                            sx={(theme) => ({
                              position: "absolute",
                              bottom: -16,
                              right: 5,
                              width: 55,
                              color:
                                subCat.id === selectedSubCat
                                  ? theme.palette.secondary.main
                                  : theme.palette.text.primary,
                            })}
                            noWrap
                          >
                            {subCat.name}
                          </Typography>
                        </Stack>
                      </Button>
                    );
                  })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};

export default ButtonMenu;
