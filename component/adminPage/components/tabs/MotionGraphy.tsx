"use client";

import {
  Avatar,
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
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import AddProduct from "../shared/AddProduct";

export type Product = {
  name: string;
  description: string;
  image: File | null;
  staff: { name: string; role: string; image: File | null }[];
  level: string;
  category: string;
};

const productsWithCat = [
  { id: 1, name: "کلاژ موشن", products: [] },
  { id: 2, name: "کمیک موشن", products: [] },
  { id: 3, name: "هندموشن", products: [] },
  { id: 4, name: "فلت موشن", products: [] },
  { id: 5, name: "اینفوموشن", products: [] },
  { id: 6, name: "رئال موشن", products: [] },
  { id: 7, name: "لوگوموشن", products: [] },
  { id: 8, name: "پوستر موشن", products: [] },
  { id: 9, name: "استوری موشن", products: [] },
];

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

const levels = ["سطح 1", "سطح 2", "سطح 3"];

const MotionGraphy = () => {
  const [age, setAge] = useState("کلاژ موشن");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cat, setCat] = useState("کلاژ موشن");
  const [level, setLevel] = useState("سطح 1");
  const [isAddStaff, setIsAddStaff] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staffImage, setStaffImage] = useState<File | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);

  const [staffArray, setStaffArray] = useState<
    { name: string; role: string; image: File | null }[]
  >([]);

  const [products, setProducts] = useState<Product[]>(
    productsWithCat.find((cat) => cat.name === age)?.products || []
  );

  const handleDeleteStaff = (name: string) => {
    setStaffArray((prev) => prev.filter((staff) => staff.name !== name));
  };

  const handleChangeLevel = (event: SelectChangeEvent<string>) => {
    setLevel(event.target.value);
  };

  const handleChangeCat = (event: SelectChangeEvent<string>) => {
    setCat(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setAge(event.target.value);
  };

  const submitProduct = () => {
    setProducts((prev) => {
      const newProduct = {
        name,
        description,
        image: productImage,
        staff: staffArray,
        category: cat,
        level,
      };

      if (typeof isEditing === "number") {
        const updated = [...prev];
        updated[isEditing] = newProduct;
        return updated;
      } else {
        return [...prev, newProduct];
      }
    });
  };

  return (
    <Stack width={"100%"} boxShadow={3} borderRadius={4} p={1} gap={1}>
      <Stack direction={"row"} alignItems={"center"} gap={3}>
        <Typography component={"h2"} fontSize={18} pr={1}>
          موشن گرافی:
        </Typography>
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
        <AddProduct
          setAge={setAge}
          productImage={productImage}
          setProductImage={setProductImage}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          level={level}
          setLevel={setLevel}
          cat={cat}
          setCat={setCat}
          staffArray={staffArray}
          setStaffArray={setStaffArray}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          open={open}
          setOpen={setOpen}
          age={age}
          products={products}
          setProducts={setProducts}
          setIsAddStaff={setIsAddStaff}
          submitProduct={submitProduct}
          handleChangeLevel={handleChangeLevel}
          levels={levels}
          handleChangeCat={handleChangeCat}
          subCat={subCat}
          isAddStaff={isAddStaff}
          staffImage={staffImage}
          setStaffImage={setStaffImage}
          staffName={staffName}
          setStaffName={setStaffName}
          setStaffRole={setStaffRole}
          staffRole={staffRole}
          handleDeleteStaff={handleDeleteStaff}
        />

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
              <Button
                onClick={() => {
                  setOpen(true);
                  setCat(age);
                }}
                variant="contained"
                sx={{ py: 1, color: "white" }}
              >
                اضافه کردن
              </Button>
            </Box>
          </Stack>
          <Stack
            borderRadius={2}
            height={"100%"}
            overflow={"auto"}
            p={1}
            gap={3}
            direction={"row"}
            sx={{ overflowX: "hidden", overflowY: "auto" }}
          >
            {products.map((product, index) => (
              <Stack key={`${product.name}-${index}`} width={200} gap={1}>
                <Avatar
                  src={product.image ? URL.createObjectURL(product.image) : ""}
                  alt="poster"
                  variant="rounded"
                  sx={{
                    width: 200,
                    height: (200 * 9) / 16,
                    objectFit: "cover",
                    borderRadius: 2,
                    backgroundColor: "#eee",
                  }}
                />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Typography width={180} noWrap>
                    {product.name}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setIsEditing(index);
                      setOpen(true);
                      setProductImage(product.image);
                      setName(product.name);
                      setDescription(product.description);
                      setLevel(product.level);
                      setCat(age);
                      setStaffArray(product.staff);
                    }}
                    size="small"
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MotionGraphy;
