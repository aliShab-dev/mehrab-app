"use client";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const subCat = [
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

const MotionGraphy = () => {
  const [age, setAge] = useState("کلاژ موشن");
  const [open, setOpen] = useState(true);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setAge(event.target.value);
  };

  return (
    <Stack width={"100%"} boxShadow={3} borderRadius={4} p={1} gap={1}>
      <Stack direction={"row"} alignItems={"center"} gap={3}>
        <Typography component={"h2"} fontSize={18} pr={1}>
          موشن گرافی:
        </Typography>
        <Button onClick={() => setOpen(!open)}>click me</Button>
      </Stack>

      <Stack
        overflow={"hidden"}
        sx={{
          position: "relative",
          height: 400,
          background: "#F8F9ff",
          border: "1px solid #aaa",
          borderRadius: 2,
          p: 2,
          gap: 2,
        }}
      >
        <Stack
          width={"100%"}
          height={"100%"}
          overflow={"hidden"}
          position={"absolute"}
          top={0}
          right={0}
          sx={{
            transform: open ? "translateX(0)" : "translateX(-100%)",
            opacity: open ? 1 : 0,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          <Typography>hello worl</Typography>
        </Stack>

        <Stack
          width={"100%"}
          height={"100%"}
          position={"absolute"}
          top={0}
          right={0}
          sx={{
            transform: open ? "translateX(100%)" : "translateX(0)",
            opacity: open ? 0 : 1,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          <Stack width={"100%"}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                alignItems: "baseline",
                gap: 2,
              }}
            >
              <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel
                  id="select-category-label"
                  sx={{
                    right: 35,
                    left: "auto",
                    transformOrigin: "top right",
                    fontSize: 16,
                  }}
                >
                  دسته بندی
                </InputLabel>
                <Select
                  labelId="select-category"
                  id="select-category"
                  value={age}
                  label="دسته بندی"
                  onChange={handleChange}
                  sx={{
                    "& legend": {
                      right: 30,
                      textAlign: "right",
                      fontSize: 15,
                    },
                  }}
                >
                  {subCat.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  دسته بندی مورد نظر را انتخاب کنید
                </FormHelperText>
              </FormControl>
              <Button variant="contained" sx={{ py: 1, color: "white" }}>
                اضافه کردن
              </Button>
            </Box>
          </Stack>
          <Stack
            border={"1px solid"}
            borderColor={(theme) => theme.palette.divider}
            borderRadius={2}
            height={"100%"}
            overflow={"auto"}
            p={1}
          >
            <Stack width={200} gap={1}>
              <div
                style={{
                  position: "relative",
                  width: 200,
                  aspectRatio: "16/9",
                }}
              >
                <Image
                  src="/poster.png"
                  alt="poster"
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: 8,
                    background: "#eee",
                  }}
                />
              </div>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Typography width={180} noWrap>
                  پوستر موشن
                </Typography>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MotionGraphy;
