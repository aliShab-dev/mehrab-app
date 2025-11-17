'use client'

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
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const fakeCustomers = [
  { id: 1, name: "mojtaba", image: "/avatar.png" },
  { id: 2, name: "mmd", image: "/avatar.png" },
  { id: 3, name: "taba", image: "/avatar.png" },
  { id: 4, name: "jiji", image: "/avatar.png" },
];

const Customers = () => {
  const [customers, setCustomers] = useState(fakeCustomers);
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    setText("");
  };

  return (
    <Stack width={"100%"} boxShadow={3} borderRadius={4} p={1} gap={1}>
      <Stack direction={"row"} alignItems={"center"} gap={3}>
        <Typography component={"h2"} fontSize={18} pr={1}>
          همراهان:
        </Typography>
      </Stack>

      <Stack width={"100%"} position={"relative"} direction={"row"}>
        <Swiper slidesPerView={"auto"} spaceBetween={20}>
          {customers.map((c, i) => (
            <SwiperSlide
              style={{
                width: "300px",
                aspectRatio: "16 / 9",
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
                    zIndex: 100
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
              "&:hover": {
                cursor: "pointer",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <Stack
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography color="primary.main" fontSize={26} fontWeight={800}>
                +
              </Typography>
              <Typography color="primary.main" fontSize={24} fontWeight={500}>
                اضاقه کردن
              </Typography>
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
                disabled={!text.trim()}
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
