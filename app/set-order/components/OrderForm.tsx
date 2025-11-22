"use client";

import { useState, useRef, FC, ChangeEvent } from "react";
import {
  Stack,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PageHeader from "@/component/pageHeader/PageHeader";
import { postOrder } from "@/component/adminPage/service/setOrderServices";

type TextBoxProps = {
  label: string;
  text: string;
  setText: (event: ChangeEvent<HTMLInputElement>) => void;
};

const TextBox: FC<TextBoxProps> = ({ label, text, setText }) => (
  <Stack
    sx={{
      pl: 0.6,
      py: 1,
      gap: 0.5,
      width: {
        xs: "100%",
        sm: "50%",
        md: "50%",
        lg: "33.33%",
      },
    }}
  >
    <Typography fontSize={{ xs: 13, sm: 15, md: 17 }} variant="subtitle2">
      {label}:
    </Typography>{" "}
    <TextField
      variant="outlined"
      fullWidth
      value={text}
      onChange={setText}
      InputProps={{
        sx: {
          backgroundColor: "#DFE0E6",
          borderRadius: 3,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      }}
    />
  </Stack>
);

export default function OrderForm() {
  const [fields, setFields] = useState<{
    name: string;
    lastName: string;
    phone: string;
    socialMedia: string;
    organName: string;
    placement: string;
    file: File | null;
    description: string;
  }>({
    name: "",
    lastName: "",
    phone: "",
    socialMedia: "",
    organName: "",
    placement: "",
    file: null,
    description: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFields((prev) => ({ ...prev, file }));
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleTextBox =
    (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postOrder({
      firstName: fields.name,
      lastName: fields.lastName,
      description: fields.description,
      orderBy: fields.organName,
      phoneNumber: fields.phone,
      publication: fields.placement,
      sample: fields.file,
      socialMedia: fields.socialMedia,
    });
  };

  return (
    <Stack
      mt={{ xs: 8, md: 15 }}
      width={{ xs: "100%", sm: "85%", md: "78%" }}
      mx={"auto"}
      mb={20}
    >
      <PageHeader Icon={DescriptionRoundedIcon} title="فرم سفارش دادن" />

      <Stack direction="row" flexWrap="wrap" width="100%" mt={5}>
        <TextBox
          label="نام"
          text={fields.name}
          setText={handleTextBox("name")}
        />
        <TextBox
          label="نام خانوادگی"
          text={fields.lastName}
          setText={handleTextBox("lastName")}
        />
        <TextBox
          label="شماره تماس"
          text={fields.phone}
          setText={handleTextBox("phone")}
        />
        <TextBox
          label="فضای مجازی"
          text={fields.socialMedia}
          setText={handleTextBox("socialMedia")}
        />
        <TextBox
          label="به سفارش"
          text={fields.organName}
          setText={handleTextBox("organName")}
        />
        <TextBox
          label="بستر انتشار"
          text={fields.placement}
          setText={handleTextBox("placement")}
        />
        <Stack width={"100%"} gap={1}>
          <Stack gap={0.5}>
            <Typography variant="subtitle2">ارسال فایل نمونه:</Typography>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleFileChange}
            />
            <TextField
              variant="outlined"
              fullWidth
              minRows={6}
              value={fields.file?.name || ""}
              onClick={handleFileClick}
              placeholder="برای انتخاب فایل کلیک کنید"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" sx={{ color: "#fff" }}>
                      <UploadFileRoundedIcon fontSize="large" />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "#DFE0E6",
                  borderRadius: 3,
                  cursor: "pointer",
                  "& input": {
                    cursor: "pointer",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              }}
            />
          </Stack>
          <Stack gap={0.5}>
            <Typography variant="subtitle2">توضیحات:</Typography>
            <TextField
              variant="outlined"
              multiline
              fullWidth
              value={fields.description}
              onChange={handleTextBox("description")}
              InputProps={{
                sx: {
                  height: 200,
                  backgroundColor: "#DFE0E6",
                  borderRadius: 3,
                  alignItems: "flex-start", // aligns content to top
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiInputBase-inputMultiline": {
                    padding: "8px", // or `0` if you want zero padding
                    height: "100%", // fills parent height
                    boxSizing: "border-box", // ensures height works well
                    lineHeight: 1.5,
                  },
                },
              }}
            />
          </Stack>
        </Stack>
        <Stack
          width={280}
          mx={"auto"}
          mt={2}
          gap={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="قوانین را مطالعه کرده ام و پذیرفته ام"
            sx={{ mr: -1.8 }}
            slotProps={{
              typography: {
                fontSize: { xs: 13, sm: 16, md: 18 },
                fontWeight: 500,
              },
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            sx={{
              color: "#fff",
              fontSize: 22,
              borderRadius: 3,
              px: 5,
              py: 1,
            }}
          >
            ثبت و ارسال
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
