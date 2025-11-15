import { IconButton, Stack } from "@mui/material";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImagesSwiper = ({ images, onDeleteImage }) => {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      direction={"row"}
      position={"relative"}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        style={{ width: "100%", height: "100%" }}
      >
        {images?.map((src, index) => (
          <SwiperSlide key={index}>
            <Stack width={'100%'} height={'100%'}>
              <img
                src={src}
                alt={`slide-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <Stack position={"absolute"} bottom={20} width={"100%"}>
                <IconButton
                  onClick={() => onDeleteImage(index)}
                  sx={{ mx: "auto" }}
                >
                  <DeleteForeverRoundedIcon color="error" fontSize="large" />
                </IconButton>
              </Stack>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default ImagesSwiper;
