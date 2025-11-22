"use client";

import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import PermiissionTabs from "./tabs/PermisionTabs";
import MotionGraphy from "./tabs/MotionGraphy";
import Movie from "./tabs/Movie";
import Audio from "./tabs/Audio";
import Graphic from "./tabs/Graphic";
import Report from "./tabs/Report";
import Customers from "./tabs/Customers";
import StaffMembers from "./tabs/StaffMembers";
import SocialMedia from "./tabs/SocialMedia";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type PermissionType = {
  can_add_motion_graphic: boolean;
  can_add_graphic_design: boolean;
  can_add_movie_and_document: boolean;
  can_add_audio: boolean;
};

const allTabs = [
  { id: 0, label: "دسترسی ها" },
  { id: 1, label: "موشن گرافی" },
  { id: 2, label: "فیلم و مستند" },
  { id: 3, label: "صوت و نریشن" },
  { id: 4, label: "گرافیک دیزاین" },
  { id: 5, label: "همراهان" },
  { id: 6, label: "اعضا" },
  { id: 7, label: "شبکه اجتماعی" },
  { id: 8, label: "سفارشات" },
];

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const AdminPanel = () => {
  const [value, setValue] = useState<number>(0);

  const storedPermission = JSON.parse(
    localStorage.getItem("permissions") || "[]"
  );

  const userRole = localStorage.getItem('role') || 'admin'

  const mapPermissionsToNumbers = (permissions: PermissionType): number[] => {
    const result: number[] = [];
    if (permissions.can_add_motion_graphic) result.push(1);
    if (permissions.can_add_graphic_design) result.push(2);
    if (permissions.can_add_movie_and_document) result.push(3);
    if (permissions.can_add_audio) result.push(4);
    return result;
  };

  const getVisibleTabs = (role: string, permissions: PermissionType) => {
    if (role == "Administrator") return allTabs;

    const allowedPermissions = mapPermissionsToNumbers(permissions);

    return allTabs.filter((tab) => {
      const hiddenForAdmin = [1, 6, 7, 8, 9];
      if (hiddenForAdmin.includes(tab.id)) return false;

      return allowedPermissions.includes(tab.id);
    });
  };

  const visibleTabs = getVisibleTabs(userRole, storedPermission);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack width={"100vw"} height={"100vh"} overflow={"hidden"}>
      <Stack width={"100%"} px={5} py={2} gap={2}>
        <Stack>
          <Typography component={"h1"} fontSize={25} fontWeight={600}>
            پنل مدیریت
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <Typography component={"h2"} fontSize={18}>
            نام ادمین:
          </Typography>
          <Typography component={"h2"} fontSize={18} color="secondary.main">
            ادمین شماره یک
          </Typography>
        </Stack>
      </Stack>

      <Stack>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="تب های اختیارات"
            sx={{ pr: 3 }}
          >
            {visibleTabs.map((tab) => (
              <Tab key={tab.id} label={tab.label} sx={{ fontSize: 20 }} />
            ))}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PermiissionTabs />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MotionGraphy />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Movie />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Audio />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <Graphic />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <Customers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <StaffMembers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          <SocialMedia />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={8}>
          <Report />
        </CustomTabPanel>
      </Stack>
    </Stack>
  );
};

export default AdminPanel;
