"use client";

import {
  alpha,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

type CustomerType = {
  id: number;
  name: string;
  image: File;
};

const fakeCustomers = [
  { id: 1, name: "mojtaba", image: "/avatar.png" },
  { id: 2, name: "mmd", image: "/avatar.png" },
  { id: 3, name: "taba", image: "/avatar.png" },
  { id: 4, name: "jiji", image: "/avatar.png" },
];

const StaffMembers = () => {
  const [customers, setCustomers] = useState(fakeCustomers);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      e.target.value = "";
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole("");
    setName("");
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <Stack width={"100%"} boxShadow={3} borderRadius={4} p={1} gap={1}>
      <Stack direction={"row"} alignItems={"center"} gap={3}>
        <Typography component={"h2"} fontSize={18} pr={1}>
          اعضا:
        </Typography>
      </Stack>

      <Stack width={"100%"} position={"relative"} direction={"row"}>
        <Swiper navigation modules={[Navigation]} slidesPerView={"auto"} spaceBetween={20}>
          {customers.map((c, i) => (
            <SwiperSlide
              style={{
                width: "140px",
                aspectRatio: "4 / 5",
                backgroundColor: "#f2f2f2",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack
                width="100%"
                height="100%"
                position="relative"
                borderRadius={3}
                overflow="hidden"
              >
                {/* FIXME: complete this shit - delete and add */}
                <Stack
                  sx={{
                    position: "absolute",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    bottom: 5,
                    zIndex: 100,
                  }}
                >
                  <IconButton>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </Stack>
                <Image
                  src={"/avatar.png"}
                  alt={"random"}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
      <Stack py={2} direction={"row"} gap={2} justifyContent={"center"}>
        <Stack>
          <Box
            sx={{
              border: (theme) => `4px dotted ${theme.palette.primary.main}`,
              width: 320,
              height: 180,
              borderRadius: 3,
              position: "relative",
              "&:hover": {
                cursor: "pointer",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <Stack
              component="label"
              width="100%"
              height="100%"
              sx={{
                cursor: "pointer",
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {/* Hidden input */}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />

              {/* Preview or placeholder */}
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt={name}
                  fill
                  style={{ objectFit: "cover", pointerEvents: "none" }}
                />
              ) : (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <Typography
                    color="primary.main"
                    fontSize={26}
                    fontWeight={800}
                  >
                    +
                  </Typography>
                  <Typography
                    color="primary.main"
                    fontSize={24}
                    fontWeight={500}
                  >
                    اضافه کردن
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack alignItems={"center"} my={"auto"}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} width={300}>
              <TextField
                label="نام عضو"
                value={name}
                onChange={handleChangeName}
                fullWidth
              />

              <TextField
                label="تقش عضو"
                value={role}
                onChange={handleChangeRole}
                fullWidth
              />

              <Button
                disabled={!name.trim() || !role.trim() || !previewUrl}
                type="submit"
                variant="contained"
                color="primary"
              >
                ثبت
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StaffMembers;
