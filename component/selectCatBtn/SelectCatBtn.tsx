import { alpha, Button, Menu, MenuItem, Stack, styled } from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Categories, Category, SubCategory } from "@/types/categories";

interface SelectCatBtnProps {
  sortOrder: "newest" | "oldest";
  setSortOrder: React.Dispatch<React.SetStateAction<"newest" | "oldest">>;
  categories: Categories;
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  selectedSubCat: SubCategory | null;
  setSelectedSubCat: React.Dispatch<React.SetStateAction<SubCategory | null>>;
  selectedLevel: number | null;
  setSelectedLevel: React.Dispatch<React.SetStateAction<number | null>>;
}
type MenuType = "category" | "subCat" | "level" | "sort";

export type TextBoxProps = {
  label: string;
  text: string;
  setText: (event: ChangeEvent<HTMLInputElement>) => void;
};

const sortOptions = [
  { label: "جدیدترین", value: "newest" },
  { label: "قدیمی‌ترین", value: "oldest" },
];

const levelOptions = [
  { id: 1, name: "سطح 1" },
  { id: 2, name: "سطح 2" },
  { id: 3, name: "سطح 3" },
];

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: 10,
  boxShadow: theme.shadows[2],
  margin: 0,
  fontSize: 10,
  width: 120,
  display: "flex",
  gap: theme.spacing(1),
  justifyContent: "start",
  position: "relative",
  color: theme.palette.text.primary,
  "& .MuiSvgIcon-root": {
    fontSize: 14,
  },
  "& .arrow": {
    position: "absolute",
    left: 10,
    color: theme.palette.secondary.main,
  },
  "&:hover": {
    boxShadow: theme.shadows[4],
  },

  [theme.breakpoints.up("sm")]: {
    fontSize: 12,
    width: 140,
    "& .MuiSvgIcon-root": {
      fontSize: 14,
    },
  },
  [theme.breakpoints.up("md")]: {
    width: 158,
    fontSize: 14,
    "& .MuiSvgIcon-root": {
      fontSize: 22,
    },
  },
}));

const SelectedCatBtn: React.FC<SelectCatBtnProps> = ({
  sortOrder,
  categories,
  selectedLevel,
  selectedSubCat,
  selectedCategory,
  setSortOrder,
  setSelectedLevel,
  setSelectedSubCat,
  setSelectedCategory,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = useState("");

  const handleOpenMenu = (
    event: MouseEvent<HTMLButtonElement>,
    type: MenuType,
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

  const handleSelectSubCat = (subCat: SubCategory) => {
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
      gap={{ xs: 1.2, sm: 2 }}
      width={"100%"}
      justifyContent={"center"}
      flexWrap={"wrap"}
    >
      <CustomButton
        disableRipple
        onClick={(e) => handleOpenMenu(e, "category")}
      >
        <CategoryRoundedIcon />
        {selectedCategory ? selectedCategory.categoryName : "دسته بندی"}
        <ExpandMoreIcon className="arrow" />
      </CustomButton>

      <CustomButton
        disableRipple
        onClick={(e) => handleOpenMenu(e, "level")}
        disabled={!selectedCategory}
      >
        <BarChartRoundedIcon />
        {selectedLevel !== null ? `سطح ${selectedLevel}` : "سطح"}
        <ExpandMoreIcon className="arrow" />
      </CustomButton>

      <CustomButton
        disableRipple
        onClick={(e) => handleOpenMenu(e, "subCat")}
        disabled={!selectedCategory}
      >
        <DashboardRoundedIcon />
        {selectedSubCat?.subCatName ?? "سبک"}
        <ExpandMoreIcon className="arrow" />
      </CustomButton>

      <CustomButton disableRipple onClick={(e) => handleOpenMenu(e, "sort")}>
        <SwapVertIcon />
        {sortOrder === "newest"
          ? "جدیدترین"
          : sortOrder === "oldest"
            ? "قدیمی‌ترین"
            : "مرتب‌سازی"}
        <ExpandMoreIcon className="arrow" />
      </CustomButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuType === "category" &&
          categories.map((cat) => (
            <MenuItem
              key={cat.categoryName}
              selected={selectedCategory?.categoryId === cat.categoryId}
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
              {cat.categoryName}
            </MenuItem>
          ))}

        {menuType === "subCat" &&
          selectedCategory?.subCatList.map((style) => (
            <MenuItem
              key={style.subCatId}
              selected={selectedSubCat?.subCatId === style.subCatId}
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
              {style.subCatName}
            </MenuItem>
          ))}

        {menuType === "level" &&
          levelOptions.map((level) => (
            <MenuItem
              key={level.id}
              selected={selectedLevel == level.id}
              onClick={() => {
                handleSelectLevel(level.id);
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
              {level.name}
            </MenuItem>
          ))}
        {menuType === "sort" &&
          sortOptions.map((opt) => (
            <MenuItem
              key={opt.value}
              selected={sortOrder === opt.value}
              onClick={() => {
                setSortOrder(opt.value as "newest" | "oldest");
                handleClose();
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
              {opt.label}
            </MenuItem>
          ))}
      </Menu>
    </Stack>
  );
};

export default SelectedCatBtn;
