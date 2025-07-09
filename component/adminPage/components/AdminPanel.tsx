"use client";

import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import PermiissionTabs from "./tabs/PermisionTabs";
import MotionGraphy from "./tabs/MotionGraphy";
import Movie from "./tabs/Movie";
import Audio from "./tabs/Audio";
import Graphic from "./tabs/Graphic";
import Report from "./tabs/Report";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
            <Tab label="دسترسی ها" sx={{ fontSize: 20 }} />
            <Tab label="موشن گرافی" sx={{ fontSize: 20 }} />
            <Tab label="فیلم و مستند" sx={{ fontSize: 20 }} />
            <Tab label="صوت و نریشن" sx={{ fontSize: 20 }} />
            <Tab label="گرافیک دیزاین" sx={{ fontSize: 20 }} />
            <Tab label="گزارشات" sx={{ fontSize: 20 }} />
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
          <Report />
        </CustomTabPanel>
      </Stack>
    </Stack>
  );
};

export default AdminPanel;
