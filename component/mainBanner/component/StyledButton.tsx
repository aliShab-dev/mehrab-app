"use client";

import { styled, Button, ButtonProps } from "@mui/material";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 18,
  gap: 5,
  padding: "1px 0px",
  paddingRight: 8,
  fontSize: 12,
  color: "white",
  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  "& .MuiButton-endIcon": {
    fontSize: 16,
    marginBottom: 1,
    "& svg": { fontSize: "inherit" },
  },
  [theme.breakpoints.up("sm")]: {
    padding: "3px 0px",
    paddingRight: 10,
    gap: 15,
    fontSize: 18,
    "& .MuiButton-endIcon": {
      fontSize: 26,
      marginBottom: 1,
      "& svg": { fontSize: "inherit" },
    },
  },
}));

export default StyledButton;
