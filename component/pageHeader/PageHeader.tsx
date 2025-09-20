'use client'

import { SvgIconComponent } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

type PageHeaderType = {
  title: string;
  Icon: SvgIconComponent;
};

const PageHeader = ({ title, Icon }: PageHeaderType) => {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      mx={"auto"}
      gap={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Icon
        color={"secondary"}
        sx={{
          mt: { xs: -0.5, md: -0.8 },
          fontSize: { xs: 28, sm: 30, md: 36, lg: 45 },
        }}
        aria-label={`Icon for ${title}`}
      />
      <Typography
        component={"h1"}
        fontSize={{ xs: 18, sm: 20, md: 26, lg: 30 }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default PageHeader;
