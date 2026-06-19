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
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import {
  deleteCustomers,
  getCustomers,
  postCustomers,
} from "../../service/customerServices";

interface Customer {
  id: number;
  name: string;
  logo: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      e.target.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postCustomers({ name: text, logo: image })
      .then((res) => {
        refreshCustomers();
      })
      .catch((err) => console.error(err));

    setText("");
    setImage(null);
    setPreviewUrl(null);
  };

  const handleDelete = async (id: number) => {
    await deleteCustomers({ id });
    refreshCustomers();
  };

  const refreshCustomers = () => {
    getCustomers()
      .then((res) => setCustomers(res))
      .catch((err) => console.error("Failed to fetch customers:", err));
  };

  useEffect(() => {
    refreshCustomers();
  }, []);

  return (
    <Stack width={"100%"} boxShadow={3} borderRadius={4} p={1} gap={1}>
      <Stack direction={"row"} alignItems={"center"} gap={3}>
        <Typography component={"h2"} fontSize={18} pr={1}>
          همراهان:
        </Typography>
      </Stack>

      <Stack width={"100%"} position={"relative"} direction={"row"}>
        <Swiper
          navigation
          modules={[Navigation]}
          slidesPerView={"auto"}
          spaceBetween={20}
        >
          {customers.map((c, i) => (
            <SwiperSlide
              key={c.id}
              style={{
                width: "300px",
                aspectRatio: "16 / 9",
                backgroundColor: "transparent",
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
                  <IconButton onClick={() => handleDelete(c.id)}>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </Stack>
                <img
                  src={c.logo ?? "/logo.png"}
                  alt="Company logo"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
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

              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt={text}
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
                label="نام موسسه"
                value={text}
                onChange={handleChange}
                fullWidth
              />

              <Button
                disabled={!text.trim() || !previewUrl}
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

export default Customers;
