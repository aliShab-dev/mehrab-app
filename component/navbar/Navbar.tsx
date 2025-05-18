"use client";
import {
  alpha,
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

const options = [
  { value: "light-green", label: "سبز ", color: "#4EBFA8" },
  { value: "green", label: " سبز روشن ", color: "#37E3C3" },
  { value: "blue", label: "آبی", color: "#00B4D8" },
];

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

  return (
    <Stack
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
        width={"90%"}
        height={"72%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} gap={0}>
          <Image
            alt="logo"
            src="/logo.png"
            width={50}
            height={65}
            style={{ paddingBottom: 3, marginLeft: -10 }}
          />
          <Stack justifyContent={"end"} pb={1}>
            <Typography fontSize={20} fontWeight={700}>
              خانواده هنری محراب
            </Typography>
            <Stack>
              <Typography
                fontWeight={100}
                fontSize={10}
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
              height: 42,
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
              borderWidth: "1px",
              mt: 1,
              mr: 1,
            }}
          />
        </Stack>

        <Stack direction={"row"} height={40} gap={1} mr={7}>
          <NavButton href="/" label="صفحه اصلی" />
          <NavButton href="/product" label="تولیدات" />
          <NavButton href="/contact" label="داستان ما" />
          <NavButton href="/contact" label="ارتباط با ما" />
        </Stack>

        <Stack direction={"row"} height={40} gap={1}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
              borderWidth: "1px",
              ml: 1,
            }}
          />
          <Stack direction="row" alignItems={"center"} gap={1.2} pl={3}>
            <Typography fontSize={16} fontWeight={600} lineHeight={1} pt={0.4}>
              09103533906
            </Typography>
            <Image alt="call-us" src="/phone.png" width={20} height={20} />

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: (theme) =>
                  alpha(theme.palette.secondary.main, 0.2),
                borderWidth: "1px",
                ml: -1,
                mr: 1,
              }}
            />
            <IconButton
              aria-label="palette"
              id="palette-button"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <CircleIcon color={"primary"} sx={{ fontSize: 28 }} />
            </IconButton>
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
                  <Typography>{option.label}</Typography>
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
