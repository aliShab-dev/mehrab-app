import { Stack, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";

type SectionHeaderType = {
  title: string;
  backIcon: { alt: string; src: string | StaticImageData };
  frontIcon: { alt: string; src: string | StaticImageData };
};

const SectionHeader = ({ title, backIcon, frontIcon }: SectionHeaderType) => {
  return (
    <Stack mr={2} mt={-3}>
      <Stack direction={"row"} gap={3}>
        <Stack position={"relative"} mt={.5}>
          <Image
            alt={backIcon.alt}
            src={backIcon.src}
            width={100}
            height={100}
            style={{ position: "absolute", top: -50, left: -15, zIndex: 90 }}
          />
          <Image
            alt={frontIcon.alt}
            src={frontIcon.src}
            width={42}
            height={42}
            style={{zIndex: 100}}
          />
        </Stack>
        <Stack>
          <Typography component={"h2"} fontSize={26} fontWeight={600}>
            {title}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SectionHeader;
