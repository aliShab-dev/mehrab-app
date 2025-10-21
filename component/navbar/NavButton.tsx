"use client";

import { Button, SxProps, Theme } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavButtonProps {
  href: string;
  label: string;
  sx?: SxProps<Theme>;
}

const NavButton = ({ href, label, sx }: NavButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link href={href} passHref>
      <Button
        disableRipple
        fullWidth
        color={isActive ? "secondary" : "inherit"}
        sx={{
          fontSize: {xs: 14, sm: 18},
          fontWeight: 800,
          color: isActive ? undefined : "text.primary",
          ...sx,
        }}
      >
        {label}
      </Button>
    </Link>
  );
};

export default NavButton;
