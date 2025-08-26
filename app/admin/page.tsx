"use client";

import AdminPanel from "@/component/adminPage/components/AdminPanel";
import LoginPanel from "@/component/adminPage/components/LoginPanel";
import { useState } from "react";
import postAdminLogin from "../../component/adminPage/service/postAdminLogin";

const AdminPage = () => {
  const [isValid, setIsValid] = useState(false);
  return isValid ? <AdminPanel /> : <LoginPanel setIsValid={setIsValid} />;
};

export default AdminPage;
