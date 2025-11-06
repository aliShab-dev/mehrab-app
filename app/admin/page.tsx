"use client";

import AdminPanel from "@/component/adminPage/components/AdminPanel";
import LoginPanel from "@/component/adminPage/components/LoginPanel";
import { useState } from "react";

const AdminPage = () => {
  const [isValid, setIsValid] = useState(false);
  return isValid ? <AdminPanel /> : <LoginPanel setIsValid={setIsValid} />;
};

export default AdminPage;
