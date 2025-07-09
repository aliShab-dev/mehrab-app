"use client";

import { SelectChangeEvent, Stack } from "@mui/material";
import { Product } from "../tabs/MotionGraphy";
import PreviewEdition from "./component/PreviewEdition";
import InputField from "./component/InputField";
import { Dayjs } from "dayjs";

interface DisplayProductInterface {
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
  staffArray: { name: string; role: string; image: File | null }[];
  setStaffArray: (
    staff: { name: string; role: string; image: File | null }[]
  ) => void;
  isEditing: number | null;
  setIsEditing: (id: number | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  setProducts: (products: Product[]) => void;
  products: Product[];
  age: string;
  setAge: (age: string) => void;
  setIsAddStaff: (isAdd: boolean) => void;
  submitProduct: () => void;
  handleChangeLevel: (event: SelectChangeEvent<string>) => void;
  levels: string[];
  handleChangeCat: (event: SelectChangeEvent<string>) => void;
  subCat: string[];
  isAddStaff: boolean;
  staffImage: File | null;
  setStaffImage: (file: File | null) => void;
  staffName: string;
  setStaffName: (name: string) => void;
  setStaffRole: (role: string) => void;
  staffRole: string;
  handleDeleteStaff: (name: string) => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  openTimer: boolean;
  handleButtonClick: () => void;
  handleClose: () => void;
  handleChange: (newValue: Dayjs | null) => void;
  episod: number | "";
  handleEpisod: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenTimer: (isOpen: boolean) => void;
  selectedTime: Dayjs | null;
  handleChangeTimer: (newValue: Dayjs | null) => void;
  poster: File | null;
  setPoster: (file: File | null) => void;
  mediaType: "audio" | "video" | "image";
}

const AddProduct = ({
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
  staffArray,
  setStaffArray,
  isEditing,
  setIsEditing,
  open,
  setOpen,
  age,
  products,
  setProducts,
  setIsAddStaff,
  submitProduct,
  handleChangeLevel,
  levels,
  handleChangeCat,
  subCat,
  isAddStaff,
  staffImage,
  setStaffImage,
  staffName,
  setStaffName,
  setStaffRole,
  staffRole,
  setAge,
  handleDeleteStaff,
  buttonRef,
  openTimer,
  handleButtonClick,
  handleClose,
  handleChangeTimer,
  episod,
  handleEpisod,
  setOpenTimer,
  selectedTime,
  poster,
  setPoster,
  mediaType,
}: DisplayProductInterface) => {
  return (
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
        <PreviewEdition
          mediaType={mediaType}
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
          setStaffArray={setStaffArray}
          setIsEditing={setIsEditing}
          setOpen={setOpen}
          products={products}
          setProducts={setProducts}
          age={age}
          setIsAddStaff={setIsAddStaff}
          submitProduct={submitProduct}
        />

        <InputField
          poster={poster}
          setPoster={setPoster}
          buttonRef={buttonRef}
          openTimer={openTimer}
          handleButtonClick={handleButtonClick}
          handleClose={handleClose}
          handleChangeTimer={handleChangeTimer}
          episod={episod}
          handleEpisod={handleEpisod}
          setOpenTimer={setOpenTimer}
          selectedTime={selectedTime}
          mediaType={mediaType}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          level={level}
          cat={cat}
          handleChangeCat={handleChangeCat}
          subCat={subCat}
          isAddStaff={isAddStaff}
          handleChangeLevel={handleChangeLevel}
          levels={levels}
          staffImage={staffImage}
          setStaffImage={setStaffImage}
          staffRole={staffRole}
          setStaffRole={setStaffRole}
          handleDeleteStaff={handleDeleteStaff}
          staffArray={staffArray}
          setStaffArray={setStaffArray}
          setIsAddStaff={setIsAddStaff}
          setStaffName={setStaffName}
          staffName={staffName}
        />
      </Stack>
    </Stack>
  );
};

export default AddProduct;
