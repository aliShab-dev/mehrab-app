"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "./MotionGraphy";
import dayjs, { Dayjs } from "dayjs";
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
  Typography,
} from "@mui/material";
import AddProduct from "../shared/AddProduct";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  createProduct,
  getProductsByCatId,
  updateProduct,
  deleteProduct as deleteProductAPI,
} from "../../service/postProduct";
import getCategories from "../../service/getCat";

type Subcategory = {
  id: number;
  created_at: string;
  name: string;
  category: string;
  category_id: number;
  is_active: boolean;
};

const productsWithCat = [
  { id: 1, name: "نریشن", products: [] },
  { id: 2, name: "صوت", products: [] },
];

const subCat = ["نریشن", "صوت"];

const levels = ["سطح 1", "سطح 2", "سطح 3"];

const Audio = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [newResponse, setNewResponse] = useState<boolean>(false);
  const [subcategories, setSubCategoies] = useState<Subcategory[]>([]);
  const [age, setAge] = useState(subCat[0]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [cat, setCat] = useState(subCat[0]);
  const [level, setLevel] = useState("سطح 1");
  const [isAddStaff, setIsAddStaff] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staffImage, setStaffImage] = useState<File | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [poster, setPoster] = useState<File | null>(null);

  const [staffArray, setStaffArray] = useState<
    { name: string; role: string; image: File | null }[]
  >([]);

  const [products, setProducts] = useState<Product[]>(
    productsWithCat.find((cat) => cat.name === age)?.products || []
  );

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [openTimer, setOpenTimer] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [episod, setEpisod] = useState<number | "">("");

  const resetInputs = () => {
    setName("");
    setDescription("");
    setStaffArray([]);
    setSelectedTime(null);
    setEpisod("");
    setCompany("");
    setProductImage(null);
    setPoster(null);
    setLevel("سطح 1");
  };

  const handleButtonClick = () => {
    setOpenTimer(true);
  };

  const handleClose = () => {
    setOpenTimer(false);
  };

  const handleChangeTimer = (newValue: Dayjs | null) => {
    setSelectedTime(newValue);
  };

  const handleEpisod = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue === "" || /^\d+$/.test(newValue)) {
      setEpisod(newValue === "" ? "" : Number(newValue));
    }
  };
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

  const handleDeleteProduct = (id: number) => {
    if (typeof isEditing === "number") {
      setNewResponse(false);
      deleteProductAPI(id)
        .then((res) => {
          resetInputs();
          setNewResponse(true);
        })
        .catch((err) => {
          console.error("❌ Delete failed:", err);
        });
    }
  };

  const submitProduct = () => {
    setNewResponse(false);
    if (typeof isEditing === "number") {
      updateProduct({
        id: isEditing,
        name,
        description,
        staff: staffArray,
        category: subcategories[0].category_id,
        duration: selectedTime ? selectedTime.format("HH:mm:ss") : "00:00:00",
        episode: episod,
        company: company,
        sub_category: subcategories.find((subCat) => subCat.name == age)?.id,
        file: productImage,
        poster,
        level: parseInt(level.replace(/[^\d]/g, ""), 10),
      })
        .then((res) => {
          resetInputs();
          setNewResponse(true);
        })
        .catch((err) => console.log(err));
    } else {
      createProduct({
        name,
        description,
        staff: staffArray,
        category: subcategories[0].category_id,
        duration: selectedTime ? selectedTime.format("HH:mm:ss") : "00:00:00",
        episode: episod,
        company: company,
        sub_category: subcategories.find((subCat) => subCat.name == age)?.id,
        file: productImage,
        poster,
        level: parseInt(level.replace(/[^\d]/g, ""), 10),
      })
        .then((res) => {
          resetInputs();
          setNewResponse(true);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getCategories()
      .then((res: Subcategory[]) => {
        setSubCategoies(res.filter((subCat) => subCat.category_id === 3));
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    const subCatId = subcategories.find((subCat) => subCat.name == age)?.id;
    if (subCatId) {
      setNewResponse(false);
      getProductsByCatId(subcategories.find((subCat) => subCat.name == age)?.id)
        .then((res) => setProducts(res))
        .catch((err) => console.log(err));
    }
  }, [age, subcategories, newResponse]);

  return (
    <Stack width={"100%"} boxShadow={3} borderRadius={4} p={1} gap={1}>
      <Stack direction={"row"} alignItems={"center"} gap={3}>
        <Typography component={"h2"} fontSize={18} pr={1}>
          صوت و نریشن:
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
          handleDeleteProduct={handleDeleteProduct}
          resetInputs={resetInputs}
          company={company}
          setCompany={setCompany}
          mediaType="audio"
          poster={poster}
          setPoster={setPoster}
          buttonRef={buttonRef}
          episod={episod}
          handleButtonClick={handleButtonClick}
          handleChange={handleButtonClick}
          handleChangeTimer={handleChangeTimer}
          handleClose={handleClose}
          handleEpisod={handleEpisod}
          openTimer={openTimer}
          selectedTime={selectedTime}
          setOpenTimer={setOpenTimer}
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
                  src={product.poster ? `${BASE_URL}${product.poster}` : ""}
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
                      setIsEditing(product.id);
                      setOpen(true);
                      setSelectedTime(
                        product.duration
                          ? dayjs(`1970-01-01 ${product.duration}`)
                          : null
                      );
                      setEpisod(product.episode ?? "");
                      setProductImage(product.file);
                      setName(product.name ?? "");
                      setDescription(product.description ?? "");
                      setLevel(`سطح ${product.level}`);
                      setPoster(product.poster);
                      setCat(age);
                      setCompany(product.company ?? "");
                      setStaffArray(product.staff ?? []);
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
export default Audio;
