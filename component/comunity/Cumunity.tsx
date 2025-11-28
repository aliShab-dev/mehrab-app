import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import SwiperStack from "./component/SwiperStack";
import { getCustomers } from "../adminPage/service/customerServices";

const Comunity = async () => {
  return (
    <Stack width={"100%"} mx={"auto"} gap={7} mt={15}>
      <Stack mx={"auto"} direction={"row"} alignItems={"center"} gap={1}>
        <Image src="/contact.png" alt="contact" width={30} height={30} />
        <Typography fontSize={25} fontWeight={600}>
          همراهان ما
        </Typography>
      </Stack>

      <Stack width={{ xs: "90%", md: "75%" }} mx={"auto"} gap={6}>
        <SwiperStack />
      </Stack>
    </Stack>
  );
};

export default Comunity;
