import { Stack, Typography } from "@mui/material";
import Image from "next/image";

const Comunity = () => {
  return (
    <Stack width={"100%"} mx={"auto"} gap={7} mt={10}>
        <Stack mx={'auto'} direction={'row'} alignItems={'center'} gap={1}>
            <Image src='/contact.png' alt="contact" width={30} height={30} />
            <Typography fontSize={25} fontWeight={600}>
                همراهان ما
            </Typography>

        </Stack>
        
      <Stack  mx={"auto"} direction={"row"} gap={6}>
        <Image
          src="/comunity.png"
          alt="comunity"
          width={100}
          height={100}
          unoptimized
        />
        <Image
          src="/comunity.png"
          alt="comunity2"
          width={100}
          height={100}
          unoptimized
        />
        <Image
          src="/comunity.png"
          alt="comunity3"
          width={100}
          height={100}
          unoptimized
        />
        <Image
          src="/comunity.png"
          alt="comunity4"
          width={100}
          height={100}
          unoptimized
        />
      </Stack>
    </Stack>
  );
};

export default Comunity;
