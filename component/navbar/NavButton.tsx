'use client';

import { Button, SxProps, Theme } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation";

interface NavButtonProps {
    href: string;
    label: string;
    sx?: SxProps<Theme>;
  }

const NavButton = ({ href, label, sx }: NavButtonProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return(

        <Link href={href} passHref>
        <Button
          color={isActive ? 'secondary' : 'inherit'}
          sx={{ mx: 1, fontSize: 18, fontWeight: 600, color: isActive ? undefined : 'text.primary', ...sx}}
        >
          {label}
        </Button>
      </Link>
    )
}

export default NavButton