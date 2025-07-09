"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import SelectStaff from "./SelectStaff";
import { Dayjs } from "dayjs";
import PosterSection from "./PosterSection";

export const StyledTextField = ({ ...props }) => (
  <TextField
    fullWidth
    {...props}
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
);

interface InputFieldProps {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  level: string;
  cat: string;
  handleChangeCat: (event: SelectChangeEvent<string>) => void;
  subCat: string[];
  isAddStaff: boolean;
  handleChangeLevel: (event: SelectChangeEvent<string>) => void;
  levels: string[];
  staffImage: File | null;
  setStaffImage: (file: File | null) => void;
  staffName: string;
  setStaffName: (name: string) => void;
  setStaffRole: (role: string) => void;
  staffRole: string;
  handleDeleteStaff: (name: string) => void;
  staffArray: { name: string; role: string; image: File | null }[];
  setStaffArray: (
    staff: { name: string; role: string; image: File | null }[]
  ) => void;
  setIsAddStaff: (isAdd: boolean) => void;
  mediaType: "audio" | "video" | "image";
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  openTimer: boolean;
  handleButtonClick: () => void;
  handleClose: () => void;
  episod: number | "";
  handleEpisod: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenTimer: (isOpen: boolean) => void;
  selectedTime: Dayjs | null;
  handleChangeTimer: (newValue: Dayjs | null) => void;
  poster: File | null;
  setPoster: (file: File | null) => void;
}

const InputField = ({
  name,
  setName,
  description,
  setDescription,
  level,
  cat,
  handleChangeCat,
  subCat,
  isAddStaff,
  handleChangeLevel,
  levels,
  staffImage,
  setStaffImage,
  setStaffName,
  handleDeleteStaff,
  setStaffRole,
  staffName,
  staffRole,
  setStaffArray,
  staffArray,
  setIsAddStaff,
  mediaType,
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
}: InputFieldProps) => {
  return (
    <Stack
      width={"100%"}
      height={380}
      gap={1.2}
      sx={{ py: 1.2, overflowX: "hidden", overflowY: "auto" }}
    >
      <StyledTextField
        label="نام کار"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <StyledTextField
        label="توضیحات"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        multiline
        minRows={1}
        maxRows={3}
        fullWidth
        sx={{
          textarea: {
            resize: "vertical",
            maxHeight: 100,
            minHeight: 50,
            overflow: "auto",
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

      {/* section for Audio and Video */}
      {mediaType !== "image" && (
        <PosterSection
          buttonRef={buttonRef}
          openTimer={openTimer}
          handleButtonClick={handleButtonClick}
          episod={episod}
          handleEpisod={handleEpisod}
          setOpenTimer={setOpenTimer}
          selectedTime={selectedTime}
          handleChangeTimer={handleChangeTimer}
          poster={poster}
          setPoster={setPoster}
          handleClose={handleClose}
        />
      )}

      {/* select your staff here */}
      <SelectStaff
        staffArray={staffArray}
        setStaffArray={setStaffArray}
        isAddStaff={isAddStaff}
        handleDeleteStaff={handleDeleteStaff}
        staffImage={staffImage}
        setStaffImage={setStaffImage}
        staffName={staffName}
        setStaffName={setStaffName}
        staffRole={staffRole}
        setStaffRole={setStaffRole}
        setIsAddStaff={setIsAddStaff}
      />
    </Stack>
  );
};

export default InputField;
