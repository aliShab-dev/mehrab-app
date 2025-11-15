"use client";

import { Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MediaPreview from "./MediaPreview";
import { useRef } from "react";
import { Dayjs } from "dayjs";
import MediaPreviewSwiper from "./MediaPreviewSwiper";
import { ProductSwiper } from "../../tabs/Graphic";

interface PreviewEditionInterface {
  selectedTime: Dayjs | null;
  isEditing: null | number;
  productImage: File[] | [];
  setProductImage: (file: File[] | []) => void;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  level: string;
  setLevel: (level: string) => void;
  cat: string;
  setCat: (cat: string) => void;
  setStaffArray: (
    staff: { name: string; role: string; image: File | null }[]
  ) => void;
  setIsEditing: (id: number | null) => void;
  setOpen: (open: boolean) => void;
  age: string;
  products: ProductSwiper[];
  setProducts: (products: ProductSwiper[]) => void;
  setIsAddStaff: (isAdd: boolean) => void;
  submitProduct: () => void;
  mediaType: "audio" | "video" | "image";
  resetInputs: () => void;
  handleDeleteProduct: (id: number) => void;
}

const PreviewEditionSwiper = ({
  handleDeleteProduct,
  selectedTime,
  productImage,
  setProductImage,
  name,
  setName,
  description,
  setDescription,
  level,
  setLevel,
  cat,
  setCat,
  setStaffArray,
  isEditing,
  setIsEditing,
  setOpen,
  age,
  products,
  setProducts,
  setIsAddStaff,
  submitProduct,
  mediaType,
  resetInputs,
}: PreviewEditionInterface) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setProductImage([...productImage, ...Array.from(files)]);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteImage = (index: number) => {
    setProductImage(productImage.filter((_, i) => i !== index));
  };

  const discardFn = () => {
    const productToDelete = products.find((p) => p.name === name);

    if (!productToDelete) {
      console.error("❌ Product not found by name:", name);
      return;
    }

    handleDeleteProduct(productToDelete.id);
    setProducts(products.filter((p) => p.name !== name));
    setOpen(false);
    resetInputs();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const cancelFn = () => {
    setOpen(false);
    setIsEditing(null);
    setIsAddStaff(false);
    resetInputs();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Stack justifyContent={"space-around"}>
      <MediaPreviewSwiper
        productImage={productImage}
        mediaType={mediaType}
        isEditing={isEditing}
        onDeleteImage={handleDeleteImage}
      />

      <Stack direction={"row"} justifyContent={"space-around"}>
        {/* <Button
          variant="contained"
          disabled={!productImage}
          startIcon={<DownloadIcon />}
          sx={{ gap: 1, color: "white" }}
          onClick={handleDownload}
        >
          دانلود
        </Button> */}
        <Button
          component="label"
          variant="contained"
          startIcon={productImage ? <EditIcon /> : <AddIcon />}
          sx={{ gap: 1, color: "white" }}
        >
          افزودن
          <input
            ref={fileInputRef}
            type="file"
            accept={`${mediaType}/*`}
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Button
          onClick={discardFn}
          variant="outlined"
          color="error"
          startIcon={<DeleteForeverIcon />}
          sx={{ gap: 1 }}
        >
          حذف کل کار
        </Button>

        <Button variant="outlined" onClick={cancelFn}>
          لغو
        </Button>
        <Button
          disabled={
            !name ||
            !description ||
            !level ||
            !cat ||
            !productImage ||
            (mediaType !== "image" && !selectedTime)
          }
          onClick={() => {
            submitProduct();
            setOpen(false);
            setName("");
            setDescription("");
            setLevel("");
            setCat(age);
            setProductImage([]);
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
  );
};

export default PreviewEditionSwiper;
