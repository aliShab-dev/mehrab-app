import { Stack, Typography } from "@mui/material";

type TextTitleType = {
  title: string;
  passage: string;
};

const TextTitle = ({ title, passage }: TextTitleType) => {
  return (
    <Stack width={'87%'} mx={'auto'}>
      <Typography fontSize={28} fontWeight={700} color={'secondary'}>{title}</Typography>
      <Typography fontSize={20}>{passage}</Typography>
    </Stack>
  );
};

export default TextTitle