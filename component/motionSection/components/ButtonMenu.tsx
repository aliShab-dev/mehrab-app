"use client";
import { alpha, styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import React from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";

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
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    margin: 0,
    // marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
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
      gap={1.7}
    >
      <Stack position={"relative"}>
        <Image
          src={expanded == name ? "/selected-folder.png" : "/Folder.png"}
          alt={expanded == name ? "selected-folder-icon" : "folder-icon"}
          width={expanded == name ? 42 : 50}
          height={expanded == name ? 42 : 50}
        />
        <Image
          src={expanded == name ? "/selected-Union.png" : "/Union.png"}
          alt={expanded == name ? "selected-Union-icon" : "Union-icon"}
          width={23}
          height={23}
          style={{
            position: "absolute",
            top: expanded == name ? 13 : 16,
            right: expanded == name ? 10 : 13,
          }}
        />
      </Stack>
      <Typography
        fontSize={22}
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
const subCat: SubCat[] = [
  { id: 1, name: "نمونه کار اول" },
  { id: 2, name: "نمونه کار دوم" },
  { id: 3, name: "نمونه کار سوم" },
];

const ButtonMenu = () => {
  const [expanded, setExpanded] = React.useState<string | false>("کلاژ موشن");
  const [selectedSubCat, setSelectedSubCat] = React.useState<number>(1);

  const handleChange = (panel: string) => (event: React.SyntheticEvent) => {
    if (panel == expanded) {
      setExpanded(false);
    } else {
      setExpanded(panel);
    }
  };

  const handleSubCatChange = (id: number) => {
    setSelectedSubCat(id);
  };

  return (
    <Stack
      width={{ xs: "100%", md: 350 }}
      // minWidth={320}
      height={{ xs: 400, md: "100%" }}
      overflow="hidden"
      sx={(theme) => ({
        overflowY: "auto",
        direction: "ltr",
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        pt: 2,
        [theme.breakpoints.up("lg")]: {
          borderTop: "none",
          pt: 0
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
      pr={1}
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
              width={"90%"}
            >
              {subCat.map((subCat) => (
                <Button
                  key={subCat.id}
                  fullWidth
                  // disableRipple
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
                      src="/banner.png"
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
                      fontSize={12}
                      sx={(theme) => ({
                        position: "absolute",
                        bottom: -12,
                        right: 10,
                        width: 65,
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
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};

export default ButtonMenu;
