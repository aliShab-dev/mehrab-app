"use client";

import { Button, Stack } from "@mui/material";
import { Product } from "../../tabs/MotionGraphy";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MediaPreview from "./MediaPreview";
import { useRef } from "react";
import { Dayjs } from "dayjs";

interface PreviewEditionInterface {
  selectedTime: Dayjs | null;
  isEditing: null | number;
  productImage: File | null;
  setProductImage: (file: File | null) => void;
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
  products: Product[];
  setProducts: (products: Product[]) => void;
  setIsAddStaff: (isAdd: boolean) => void;
  submitProduct: () => void;
  mediaType: "audio" | "video" | "image";
  resetInputs: () => void;
  handleDeleteProduct: (id: number) => void;
}

const PreviewEdition = ({
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
  const handleDownload = () => {
    if (!productImage) return;

    const url = URL.createObjectURL(productImage);
    const link = document.createElement("a");
    link.href = url;
    link.download = productImage.name || "downloaded-image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
      <MediaPreview
        productImage={productImage}
        mediaType={mediaType}
        isEditing={isEditing}
      />

      <Stack direction={"row"} justifyContent={"space-around"}>
        <Button
          variant="contained"
          disabled={!productImage}
          startIcon={<DownloadIcon />}
          sx={{ gap: 1, color: "white" }}
          onClick={handleDownload}
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
  );
};

export default PreviewEdition;
