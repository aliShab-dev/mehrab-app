"use client";
import {
  alpha,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NavButton from "./NavButton";
import { useContext, useState } from "react";
import { PaletteType, ThemeContext } from "@/app/ThemeContext";
import CircleIcon from "@mui/icons-material/Circle";
import MenuIcon from "@mui/icons-material/Menu";

const options = [
  { value: "light-green", label: "سبز ", color: "#4EBFA8" },
  { value: "green", label: " سبز روشن ", color: "#37E3C3" },
  { value: "blue", label: "آبی", color: "#00B4D8" },
];

const ListNavButton = [
  { name: "صفحه اصلی", href: "/" },
  { name: "تولیدات", href: "/products" },
  { name: "داستان ما", href: "/about-us" },
  // { name: "ارتباط با ما", href: "/contact" }, // commented out as in your code
  { name: "ثبت سفارش", href: "/set-order" },
];

export function toPersianDigits(str: string) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (d) => persianDigits[+d]);
}

const Navbar = () => {
  const themeContext = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!themeContext) return null;

  const { palette, setPalette } = themeContext;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option?: PaletteType) => {
    if (option && option !== palette) {
      setPalette(option);
    }
    setAnchorEl(null);
  };
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorElMenu);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = (option?: PaletteType) => {
    setAnchorElMenu(null);
  };

  return (
    <Stack
      component={"nav"}
      direction={"row"}
      justifyContent={"center"}
      sx={{
        width: "100%",
        height: 120,
        background: (theme) =>
          `linear-gradient(to top,rgba(248, 249, 255, .01), ${alpha(
            theme.palette.navbarColor.main,
            0.9
          )})`,
        pt: 0,
      }}
    >
      <Stack
        direction={"row"}
        width={"80%"}
        height={"72%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          component={"a"}
          href="/"
          direction={"row"}
          gap={0}
          sx={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: 40, md: 50 },
              height: { xs: 55, md: 65 },
              pb: 0.5,
              ml: -1,
            }}
          >
            <Image
              priority
              alt="logo"
              src="/logo.png"
              fill
              sizes="(max-width: 600px) 40px, 50px"
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
          <Stack
            justifyContent={"end"}
            pb={1}
            display={{ xs: "flex", sm: "flex" }}
          >
            <Typography
              fontSize={{
                xs: 16,
                md: 22,
                color: "#000",
                textDecoration: "none",
              }}
              fontWeight={800}
            >
              خانواده هنری محراب
            </Typography>
            <Stack>
              <Typography
                fontWeight={100}
                fontSize={{ xs: 8, md: 10 }}
                color="secondary.main"
                sx={{
                  letterSpacing: "0.2em",
                  whiteSpace: "nowrap",
                }}
              >
                Mehrab Gaphic Art Family
              </Typography>
            </Stack>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              display: { xs: "none", sm: "block" },
              height: 42,
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
              borderWidth: "1px",
              mt: 1,
              mr: 1,
            }}
          />
        </Stack>

        <Stack
          display={{ xs: "none", lg: "flex" }}
          direction={"row"}
          height={40}
          gap={1}
          mr={7}
        >
          {ListNavButton.map((item) => (
            <NavButton key={item.name} href={item.href} label={item.name} />
          ))}
        </Stack>

        <Stack direction="row" alignItems={"center"} gap={1.2} pl={0}>
          <Stack direction={"row"} height={40} gap={1} alignItems={"center"}>
            <Stack display={{ xs: "flex", lg: "none" }}>
              <IconButton color="primary" onClick={handleClickMenu}>
                <MenuIcon
                  sx={{
                    fontSize: 28,
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.main}`,
                    borderRadius: 1,
                  }}
                />
              </IconButton>
            </Stack>

            <Stack
              display={{ xs: "none", sm: "flex" }}
              gap={1}
              direction={"row"}
            >
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderColor: (theme) =>
                    alpha(theme.palette.secondary.main, 0.2),
                  borderWidth: "1px",
                  ml: 3,
                }}
              />
              <Typography
                fontSize={16}
                fontWeight={600}
                lineHeight={1}
                pt={0.8}
              >
                {toPersianDigits("09103533906")}
              </Typography>
              <Image alt="call-us" src="/phone.png" width={22} height={22} />
            </Stack>

            {/* <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: (theme) =>
                  alpha(theme.palette.secondary.main, 0.2),
                borderWidth: "1px",
              }}
            /> */}
            {/* <IconButton
              aria-label="palette"
              id="palette-button"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <CircleIcon color={"primary"} sx={{ fontSize: 28 }} />
            </IconButton> */}

            <Menu
              id="palette-menu"
              anchorEl={anchorElMenu}
              open={openMenu}
              onClose={() => handleCloseMenu()}
              slotProps={{
                list: {
                  sx: {
                    py: 0,
                  },
                },
                paper: {
                  style: {
                    width: "14ch",
                  },
                },
              }}
              sx={{ p: 0 }}
            >
              {ListNavButton.map((item) => (
                <NavButton key={item.name} href={item.href} label={item.name} />
              ))}
              <Divider />
              <Stack
                display={{ xs: "flex", sm: "none" }}
                direction="row"
                alignItems="center"
                gap={1}
                py={2}
                px={2}
              >
                <a
                  href="tel:09103533906"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Typography
                    fontSize={13}
                    fontWeight={600}
                    lineHeight={1}
                    pt={0.7}
                  >
                    {toPersianDigits("09103533906")}
                  </Typography>
                  <Image
                    alt="call-us"
                    src="/phone.png"
                    width={16}
                    height={16}
                  />
                </a>
              </Stack>
            </Menu>

            <Menu
              id="palette-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose()}
              slotProps={{
                list: {
                  sx: {
                    py: 0,
                  },
                },
                paper: {
                  style: {
                    width: "15ch",
                  },
                },
              }}
              sx={{ p: 0 }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  selected={option.value === palette}
                  onClick={() => {
                    setPalette(option.value as PaletteType);
                    handleClose();
                  }}
                  sx={{ gap: 1, m: 0.6, borderRadius: 2, p: 0, py: 1 }}
                >
                  <CircleIcon
                    sx={{ color: option.color, fontSize: 16, mr: 1 }}
                  />
                  <Typography fontSize={12}>{option.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
