"use client";

import {
  alpha,
  Avatar,
  Button,
  Checkbox,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import SaveIcon from "@mui/icons-material/Save";

const admins = [
  { id: 1, name: "ادمین شماره یک", password: 1245, permission: [1, 3] },
  { id: 2, name: "ادمین شماره دو", password: 1245, permission: [2] },
  { id: 3, name: "ادمین شماره سه", password: 1245, permission: [3] },
  { id: 4, name: "ادمین شماره 5", password: "1245", permission: [4, 1] },
  { id: 6, name: "ادمین سس 5", password: "1245", permission: [4, 3, 2] },
  { id: 5, name: "ادمین شماره 4", password: 1245, permission: [2] },
];

const permissionsList = [
  "موشن گرافی",
  "گرافیک دیزاین",
  "فیلم و مستند",
  "صوت و نریشن",
];

const PermissionTabs = () => {
  const [selectedAdmin, setSelectedAdmin] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string | number>("");
  const [adminPermission, setAdminPermission] = useState<number[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (permission: string) => {
    const permissionId = permissionsList.indexOf(permission) + 1;
    setAdminPermission((prevSelected) =>
      prevSelected.includes(permissionId)
        ? prevSelected.filter((id) => id !== permissionId)
        : [...prevSelected, permissionId]
    );
  };

  const handleAdminClick = (adminId: number) => {
    setSelectedAdmin(adminId);
    const admin = admins.find((a) => a.id === adminId);
    if (admin) {
      setName(admin.name);
      setPassword(admin.password);
      setAdminPermission(admin.permission);
    }
  };

  const resetHandler = () => {
    setName("");
    setPassword("");
    setAdminPermission([]);
    setImage(null);
  };

  return (
    <Stack width={"100%"} boxShadow={3} borderRadius={4} p={1} gap={1}>
      <Stack direction={"row"} alignItems={"center"} gap={3}>
        <Typography component={"h2"} fontSize={18} pr={1}>
          ادمین ها:
        </Typography>
        <Button
          variant="contained"
          sx={{ color: "white" }}
          onClick={() => {
            handleAdminClick(0);
            resetHandler();
          }}
        >
          اضافه کردن ادمین
        </Button>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          position: "relative",
          height: 400,
          background: "#F8F9ff",
          border: "1px solid #aaa",
          borderRadius: 2,
          p: 2,
          gap: 2,
        }}
      >
        <Stack
          width={{ xs: selectedAdmin == null ? "100%" : 0, sm: "30%" }}
          height={"100%"}
          overflow={"auto"}
          gap={1.2}
          sx={{
            position: { xs: "absolute", sm: "relative" },
            top: 0,
            right: 0,
            opacity: { xs: selectedAdmin !== null ? 0 : 1, sm: 1 },
            transform: {
              xs:
                selectedAdmin !== null ? "translateX(-100%)" : "translateX(0)",
              sm: "translateX(0)",
            },
            pointerEvents: selectedAdmin !== null ? "none" : "auto",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {admins.map((admin) => (
            <Stack
              component={"button"}
              key={admin.id}
              width={"100%"}
              direction={"row"}
              onClick={() => handleAdminClick(admin.id)}
              borderColor={(theme) => alpha(theme.palette.secondary.main, 0.5)}
              bgcolor={(theme) =>
                selectedAdmin === admin.id
                  ? alpha(theme.palette.primary.main, 0.3)
                  : "transparent"
              }
              borderRadius={3}
              sx={{ cursor: "pointer", py: 0.4 }}
            >
              <Avatar
                src="/"
                alt={admin.name}
                sx={{
                  width: 56,
                  height: 56,
                  background: (theme) =>
                    alpha(theme.palette.secondary.main, 0.5),
                  fontSize: 32,
                }}
              />
              <Stack justifyContent={"space-around"} textAlign={"start"}>
                <Typography component={"h2"} fontSize={18} pr={1}>
                  {admin.name}
                </Typography>
                <Typography
                  component={"h2"}
                  color="secondary.main"
                  fontSize={14}
                  pr={1}
                >
                  {admin.permission
                    .map((p) => {
                      return permissionsList[p - 1];
                    })
                    .join(", ")}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Stack
          width={{ xs: selectedAdmin == null ? 0 : "100%", sm: "70%" }}
          border={"1px solid #aaa"}
          height={"100%"}
          borderRadius={2}
          sx={{
            position: { xs: "absolute", sm: "relative" },
            top: 0,
            right: 0,
            opacity: { xs: selectedAdmin == null ? 0 : 1, sm: 1 },
            transform: {
              xs: selectedAdmin == null ? "translateX(100%)" : "translateX(0)",
              sm: "translateX(0)",
            },
            pointerEvents: selectedAdmin == null ? "none" : "auto",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {selectedAdmin !== null ? (
            <Stack gap={{ xs: 2, md: 3 }} p={1} py={2}>
              <Stack width={"100%"} textAlign={"center"}>
                <Typography component={"h2"} fontSize={22} pr={1}>
                  {selectedAdmin && selectedAdmin > 0
                    ? " ویرایش ادمین"
                    : "اضافه کردن ادمین"}
                </Typography>
              </Stack>
              <Stack direction={{ xs: "column", md: "row" }} gap={1}>
                <TextField
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value.trimStart())}
                  variant="outlined"
                  label={"نام کاربری"}
                  type="text"
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    "& label": {
                      right: 25,
                      left: "auto",
                      fontSize: 16,
                    },

                    "& legend": {
                      right: 30,
                      textAlign: "right",
                      fontSize: 18,
                    },
                  }}
                />
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trimStart())}
                  fullWidth
                  variant="outlined"
                  label="رمز عبور"
                  type={"text"}
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    "& label": {
                      right: 25,
                      left: "auto",
                      fontSize: 16,
                    },

                    "& legend": {
                      right: 30,
                      textAlign: "right",
                      fontSize: 18,
                    },
                  }}
                />
              </Stack>
              <Stack spacing={2}>
                <Button
                  color="secondary"
                  variant="outlined"
                  component="label"
                  sx={{ py: 1, gap: 2 }}
                  startIcon={<InsertPhotoIcon />}
                >
                  انتخاب عکس
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    hidden
                    onChange={handleChange}
                  />
                </Button>

                {image && (
                  <Typography variant="body2">
                    تصویر انتخاب شده: {image.name}
                  </Typography>
                )}
              </Stack>
              <Stack>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleClick}
                  sx={{ minWidth: 200, fontSize: 15 }}
                >
                  {adminPermission.length > 0
                    ? permissionsList
                        .filter((_, index) =>
                          adminPermission.includes(index + 1)
                        )
                        .join(", ")
                    : "سطوح دسترسی"}
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  dir="rtl"
                >
                  {permissionsList.map((permission) => (
                    <MenuItem
                      key={permission}
                      onClick={() => handleToggle(permission)}
                    >
                      <Checkbox
                        checked={adminPermission.includes(
                          permissionsList.indexOf(permission) + 1
                        )}
                      />
                      <ListItemText primary={permission} />
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
              <Stack direction={"row"} gap={2} mt={{ xs: 0, md: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    gap: 2,
                    fontSize: { xs: 14, sm: 18 },
                    width: "70%",
                  }}
                  startIcon={<SaveIcon />}
                >
                  {selectedAdmin ? "ذخیره تغییرات" : "افزودن ادمین جدید"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSelectedAdmin(null);
                    resetHandler();
                  }}
                  sx={{ gap: 2, fontSize: { xs: 14, sm: 18 }, width: "30%" }}
                >
                  لغو
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack textAlign={"center"} height={"100%"}>
              <Typography
                fontSize={22}
                variant="body2"
                color="text.secondary"
                my={"auto"}
              >
                هیچ ادمینی انتخاب نشده است.
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PermissionTabs;
