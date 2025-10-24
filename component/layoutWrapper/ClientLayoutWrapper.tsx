"use client";

import { usePathname } from "next/navigation";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

interface Props {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: Props) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}
