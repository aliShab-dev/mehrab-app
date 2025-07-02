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

  const [products, setProducts] = useState<
    {
      name: string;
      description: string;
      image: File | null;
      staff: { name: string; role: string; image: File | null }[];
      level: string;
      category: string;
    }[]
  >(productsWithCat.find((cat) => cat.name === age)?.products || []);

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
            p: 1,
          }}
        >
          <Stack direction="row" width="100%" height="100%" gap={2}>
            <Stack justifyContent={"space-around"}>
              <Box
                sx={{
                  height: 300,
                  position: "relative",
                  aspectRatio: "16/9",
                  borderRadius: 1,
                  overflow: "hidden",
                  backgroundColor: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src={
                    productImage ? URL.createObjectURL(productImage) : undefined
                  }
                  alt="Product Image"
                  variant="rounded"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                >
                  {!productImage && (
                    <ImageNotSupportedIcon
                      sx={{ fontSize: 48, color: "#aaa" }}
                    />
                  )}
                </Avatar>
              </Box>
              <Stack direction={"row"} justifyContent={"space-around"}>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{ gap: 1, color: "white" }}
                >
                  دانلود
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={productImage ? <EditIcon /> : <AddIcon />}
                  sx={{ gap: 1, color: "white" }}
                >
                  {productImage ? "ویرایش" : "افزودن"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProductImage(file);
                        ``;
                      }
                    }}
                  />
                </Button>
                <Button
                  onClick={() => {
                    setProducts(
                      products.filter((product, i) => product.name !== name)
                    );
                    setOpen(false);
                    setName("");
                    setDescription("");
                    setLevel("");
                    setCat(age);
                    setProductImage(null);
                    setStaffArray([]);
                  }}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  sx={{ gap: 1 }}
                >
                  حذف کل کار
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpen(false);
                    setName("");
                    setDescription("");
                    setLevel("");
                    setCat(age);
                    setProductImage(null);
                    setStaffArray([]);
                    setIsAddStaff(false);
                    setIsEditing(null);
                  }}
                >
                  لغو
                </Button>
                <Button
                  disabled={
                    !name || !description || !level || !cat || !productImage
                  }
                  onClick={() => {
                    submitProduct();
                    setOpen(false);
                    setName("");
                    setDescription("");
                    setLevel("");
                    setCat(age);
                    setProductImage(null);
                    setStaffArray([]);
                    setIsAddStaff(false);
                    setIsEditing(null);
                  }}
                  variant="contained"
                  sx={{ color: "white" }}
                >
                  ثبت کار
                </Button>
              </Stack>
            </Stack>
            <Stack width={"100%"} gap={1}>
              <TextField
                label="نام کار"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{
                  "& label": {
                    right: 25,
                    left: "auto",
                    fontSize: 16,
                  },

                  "& legend": {
                    right: 30,
                    textAlign: "right",
                    fontSize: 18,
                  },
                }}
              />
              <TextField
                label="توضیحات"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                sx={{
                  "& label": {
                    right: 25,
                    left: "auto",
                    fontSize: 16,
                  },

                  "& legend": {
                    right: 30,
                    textAlign: "right",
                    fontSize: 18,
                  },
                }}
              />
              <Stack direction={"row"} width={"100%"} gap={2}>
                <FormControl sx={{ minWidth: 120, width: "100%" }}>
                  <InputLabel
                    id="select-category-label"
                    sx={{
                      right: 35,
                      left: "auto",
                      transformOrigin: "top right",
                      fontSize: 16,
                    }}
                  >
                    سطع کار
                  </InputLabel>

                  <Select
                    fullWidth
                    labelId="select-category"
                    id="select-category"
                    value={level}
                    label="سطح کار"
                    onChange={handleChangeLevel}
                    sx={{
                      "& legend": {
                        right: 30,
                        textAlign: "right",
                        fontSize: 15,
                      },
                    }}
                  >
                    {levels.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120, width: "100%" }}>
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
                    fullWidth
                    labelId="select-category"
                    id="select-category"
                    value={cat}
                    label="دسته بندی"
                    onChange={handleChangeCat}
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
                </FormControl>
              </Stack>
              <Stack
                position={"relative"}
                height={"100%"}
                border={"1px solid #bbb"}
                borderRadius={2}
                p={1}
                mt={1}
                sx={{}}
              >
                <Stack
                  sx={{
                    position: "absolute",
                    top: -12,
                    right: 0,
                    width: "100%",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      bgcolor: "background.paper",
                      width: 100,
                    }}
                  >
                    عوامل ساخت
                  </Typography>
                </Stack>
                <Stack
                  width={"100%"}
                  height={"100%"}
                  overflow={"hidden"}
                  position={"relative"}
                >
                  <Stack
                    width={"100%"}
                    height={"100%"}
                    overflow={"hidden"}
                    position={"absolute"}
                    top={0}
                    right={0}
                    sx={{
                      overflowY: "auto",
                      transform: isAddStaff
                        ? "translateX(0)"
                        : "translateX(-100%)",
                      opacity: isAddStaff ? 1 : 0,
                      transition: "transform 0.3s ease, opacity 0.3s ease",
                      p: 0,
                    }}
                  >
                    <Stack direction={"row"} width={"100%"} gap={2}>
                      <Stack spacing={1}>
                        {staffImage ? (
                          <Box
                            component="img"
                            src={URL.createObjectURL(staffImage)}
                            alt="Preview"
                            sx={{
                              width: 100,
                              height: "auto",
                              aspectRatio: "4/5",
                              borderRadius: 1,
                              border: "1px solid #ccc",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 100,
                              aspectRatio: "4/5",
                              border: (theme) =>
                                `3px dotted ${theme.palette.primary.main}`,
                            }}
                          ></Box>
                        )}
                        <label htmlFor="upload-image">
                          <input
                            id="upload-image"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setStaffImage(file);
                              }
                            }}
                          />
                          <Button
                            size="small"
                            variant="outlined"
                            component="span"
                          >
                            ارسال عکس
                          </Button>
                        </label>
                      </Stack>
                      <Stack gap={1} pt={1} width={"100%"}>
                        <TextField
                          fullWidth
                          size="small"
                          label="نام عضو"
                          value={staffName}
                          onChange={(e) => setStaffName(e.target.value)}
                          sx={{
                            "& label": {
                              right: 25,
                              left: "auto",
                              fontSize: 16,
                            },

                            "& legend": {
                              right: 30,
                              textAlign: "right",
                              fontSize: 18,
                            },
                          }}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          label="مسئولیت عضو"
                          value={staffRole}
                          onChange={(e) => setStaffRole(e.target.value)}
                          sx={{
                            "& label": {
                              right: 25,
                              left: "auto",
                              fontSize: 16,
                            },

                            "& legend": {
                              right: 30,
                              textAlign: "right",
                              fontSize: 18,
                            },
                          }}
                        />
                        <Stack direction={"row"} gap={3}>
                          <Button
                            fullWidth
                            disabled={!staffName || !staffRole}
                            onClick={() => {
                              setStaffArray([
                                ...staffArray,
                                {
                                  name: staffName,
                                  role: staffRole,
                                  image: staffImage,
                                },
                              ]);
                              setStaffName("");
                              setStaffRole("");
                              setStaffImage(null);
                              setIsAddStaff(false);
                            }}
                            variant="contained"
                            sx={{ color: "white" }}
                          >
                            ارسال
                          </Button>
                          <Button
                            onClick={() => {
                              setIsAddStaff(false);
                              setStaffName("");
                              setStaffRole("");
                              setStaffImage(null);
                            }}
                            fullWidth
                            variant="outlined"
                          >
                            لغو
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack
                    width={"100%"}
                    position={"absolute"}
                    top={0}
                    right={0}
                    sx={{
                      gap: 2,
                      transform: isAddStaff
                        ? "translateX(100%)"
                        : "translateX(0)",
                      opacity: isAddStaff ? 0 : 1,
                      transition: "transform 0.3s ease, opacity 0.3s ease",
                    }}
                  >
                    <Stack
                      height={110}
                      direction={"row"}
                      overflow={"auto"}
                      sx={{ overflowX: "auto", overflowY: "hidden", gap: 1 }}
                    >
                      {staffArray.map((staff) => (
                        <Tooltip key={staff.name} title={staff.name}>
                          <Stack
                            textAlign={"center"}
                            width={62}
                            position={"relative"}
                          >
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteStaff(staff.name)}
                              sx={{
                                position: "absolute",
                                top: 40,
                                left: -5,
                                zIndex: 100,
                              }}
                            >
                              <DeleteForeverIcon fontSize="small" />
                            </IconButton>
                            <Avatar
                              src={
                                staff.image
                                  ? URL.createObjectURL(staff.image)
                                  : undefined
                              }
                              alt={staff.name}
                              sx={{ width: 62, height: 62 }}
                            />
                            <Typography
                              variant="body2"
                              fontSize={10}
                              width={"100%"}
                              noWrap
                            >
                              {staff.name}
                            </Typography>
                          </Stack>
                        </Tooltip>
                      ))}
                    </Stack>
                    <Stack>
                      <Button
                        variant="outlined"
                        onClick={() => setIsAddStaff(!isAddStaff)}
                      >
                        اضافه کردن اعضا
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
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
