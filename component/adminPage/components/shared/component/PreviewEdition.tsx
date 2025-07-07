import { Avatar, Box, Button, Stack } from "@mui/material";
import { Product } from "../../tabs/MotionGraphy";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MediaPreview from "./MediaPreview";
import { useRef } from "react";

interface PreviewEditionInterface {
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
}

const PreviewEdition = ({
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
  setIsEditing,
  setOpen,
  age,
  products,
  setProducts,
  setIsAddStaff,
  submitProduct,
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
    URL.revokeObjectURL(url); // Clean up
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      // clear the input value so that the same file can be picked again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const discardFn = () => {
    setProducts(products.filter((product, i) => product.name !== name));
    setOpen(false);
    setName("");
    setDescription("");
    setLevel("");
    setCat(age);
    setProductImage(null);
    setStaffArray([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const cancelFn = () => {
    setOpen(false);
    setName("");
    setDescription("");
    setLevel("");
    setCat(age);
    setProductImage(null);
    setStaffArray([]);
    setIsAddStaff(false);
    setIsEditing(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Stack justifyContent={"space-around"}>
      <MediaPreview productImage={productImage} mediaType="audio" />

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
            accept="audio/*"
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
          disabled={!name || !description || !level || !cat || !productImage}
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
