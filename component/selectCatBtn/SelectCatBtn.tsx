import {
  alpha,
  Button,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

export type Category = {
  name: string;
  subCat: string[];
  level: number[];
};

type MenuType = "category" | "subCat" | "level" | "";

export type TextBoxProps = {
  label: string;
  text: string;
  setText: (event: ChangeEvent<HTMLInputElement>) => void;
};

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

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: 10,
  boxShadow: theme.shadows[3],
  margin: 0,
  fontSize: 14,
  width: 180,
  display: "flex",
  gap: theme.spacing(1),
  justifyContent: "start",
  position: "relative",
  color: theme.palette.text.primary,
  "& .MuiSvgIcon-root": {
    fontSize: 18,
  },
  "& .arrow": {
    position: "absolute",
    left: 10,
    color: theme.palette.secondary.main,
  },
  "&:hover": {
    boxShadow: theme.shadows[5],
  },
}));

type CatButton = {
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  selectedSubCat: string | null;
  setSelectedSubCat: React.Dispatch<React.SetStateAction<string | null>>;
  selectedLevel: number | null;
  setSelectedLevel: React.Dispatch<React.SetStateAction<number | null>>;
};

const SelectedCatBtn = ({
  selectedLevel,
  selectedSubCat,
  selectedCategory,
  setSelectedLevel,
  setSelectedSubCat,
  setSelectedCategory,
}: CatButton) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = useState("");

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
  return (
    <Stack
      direction="row"
      gap={3}
      width={"100%"}
      justifyContent={"space-between"}
    >
      <CustomButton onClick={(e) => handleOpenMenu(e, "category")}>
        <CategoryRoundedIcon />
        {selectedCategory ? selectedCategory.name : "دسته بندی"}
        <ExpandMoreIcon className="arrow" />
      </CustomButton>

      <CustomButton
        onClick={(e) => handleOpenMenu(e, "level")}
        disabled={!selectedCategory}
      >
        <BarChartRoundedIcon />
        {selectedLevel !== null ? `سطح ${selectedLevel}` : "سطح"}
        <ExpandMoreIcon className="arrow" />
      </CustomButton>

      <CustomButton
        onClick={(e) => handleOpenMenu(e, "subCat")}
        disabled={!selectedCategory}
      >
        <DashboardRoundedIcon />
        <Typography fontSize={14} textAlign={"start"} width={"100%"} noWrap>
          {selectedSubCat ?? "سبک"}
        </Typography>
        <ExpandMoreIcon className="arrow" />
      </CustomButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuType === "category" &&
          categories.map((cat) => (
            <MenuItem
              key={cat.name}
              selected={selectedCategory?.name === cat.name}
              onClick={() => handleSelectCategory(cat)}
              sx={{
                mx: 0.5,
                my: 0.5,
                borderRadius: 3,
                fontSize: 12,
                "&.Mui-selected": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
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
              sx={{
                mx: 0.5,
                my: 0.5,
                borderRadius: 3,
                fontSize: 12,
                "&.Mui-selected": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                },
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
              sx={{
                mx: .5,
                my: 0.5,
                borderRadius: 3,
                fontSize: 12,
                "&.Mui-selected": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              سطح {level}
            </MenuItem>
          ))}
      </Menu>
    </Stack>
  );
};

export default SelectedCatBtn;
