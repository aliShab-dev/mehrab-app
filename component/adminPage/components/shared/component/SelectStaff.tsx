import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledTextField } from "./InputField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface SelectStaffProps {
  staffArray: { name: string; role: string; image: File | null }[];
  setStaffArray: (
    staff: { name: string; role: string; image: File | null }[]
  ) => void;
  isAddStaff: boolean;
  handleDeleteStaff: (name: string) => void;
  staffImage: File | null;
  setStaffImage: (file: File | null) => void;
  staffName: string;
  setStaffName: (name: string) => void;
  staffRole: string;
  setStaffRole: (role: string) => void;
  setIsAddStaff: (isAdd: boolean) => void;
}

const SelectStaff = ({
  staffArray,
  setStaffArray,
  isAddStaff,
  handleDeleteStaff,
  setStaffImage,
  staffName,
  staffRole,
  staffImage,
  setStaffName,
  setStaffRole,
  setIsAddStaff,
}: SelectStaffProps) => {
  return (
    <Stack
      position={"relative"}
      border={"1px solid #bbb"}
      borderRadius={2}
      p={1}
      mt={1}
    >
      <Stack
        sx={{
          position: "absolute",
          top: -12,
          right: 0,
          width: "100%",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            bgcolor: "background.paper",
            width: 100,
          }}
        >
          عوامل ساخت
        </Typography>
      </Stack>
      <Stack
        width={"100%"}
        height={170}
        overflow={"visisble"}
        position={"relative"}
      >
        <Stack
          width={"100%"}
          height={"100%"}
          overflow={"hidden"}
          position={"absolute"}
          top={0}
          right={0}
          sx={{
            overflowY: "auto",
            transform: isAddStaff ? "translateX(0)" : "translateX(-100%)",
            opacity: isAddStaff ? 1 : 0,
            transition: "transform 0.3s ease, opacity 0.3s ease",
            p: 0,
          }}
        >
          <Stack direction={"row"} width={"100%"} gap={2}>
            <Stack spacing={1}>
              {staffImage ? (
                <Box
                  component="img"
                  src={staffImage ? `${staffImage}` : ""}
                  alt="Preview"
                  sx={{
                    width: 120,
                    height: "auto",
                    aspectRatio: "4/5",
                    borderRadius: 1,
                    border: "1px solid #ccc",
                  }}
                />
              ) : (
                <Button
                  component="label"
                  sx={{
                    width: 120,
                    aspectRatio: "4/5",
                    border: (theme) =>
                      `3px dotted ${theme.palette.primary.main}`,
                  }}
                >
                  ارسال عکس
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setStaffImage(file);
                      }
                    }}
                  />
                </Button>
              )}
            </Stack>
            <Stack
              gap={1}
              pt={1}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Stack gap={1.2}>
                <StyledTextField
                  size="small"
                  label="نام عضو"
                  value={staffName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStaffName(e.target.value)
                  }
                />
                <StyledTextField
                  size="small"
                  label="مسئولیت عضو"
                  value={staffRole}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStaffRole(e.target.value)
                  }
                />
              </Stack>

              <Stack direction={"row"} gap={3}>
                <Button
                  fullWidth
                  disabled={!staffName || !staffRole}
                  onClick={() => {
                    setStaffArray([
                      ...staffArray,
                      {
                        name: staffName,
                        role: staffRole,
                        image: staffImage,
                      },
                    ]);
                    setStaffName("");
                    setStaffRole("");
                    setStaffImage(null);
                    setIsAddStaff(false);
                  }}
                  variant="contained"
                  sx={{ color: "white" }}
                >
                  ارسال
                </Button>
                <Button
                  onClick={() => {
                    setIsAddStaff(false);
                    setStaffName("");
                    setStaffRole("");
                    setStaffImage(null);
                  }}
                  fullWidth
                  variant="outlined"
                >
                  لغو
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          width={"100%"}
          position={"absolute"}
          top={20}
          right={0}
          sx={{
            gap: 2,
            transform: isAddStaff ? "translateX(100%)" : "translateX(0)",
            opacity: isAddStaff ? 0 : 1,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          <Stack
            height={90}
            direction={"row"}
            overflow={"auto"}
            sx={{ overflowX: "auto", overflowY: "hidden", gap: 1 }}
          >
            {staffArray &&
              staffArray.length &&
              staffArray.map((staff) => (
                <Tooltip key={staff.name} title={staff.name}>
                  <Stack textAlign={"center"} width={62} position={"relative"}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteStaff(staff.name)}
                      sx={{
                        position: "absolute",
                        top: 40,
                        left: -5,
                        zIndex: 100,
                      }}
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                    <Avatar
                      src={
                        staff.image
                          ? URL.createObjectURL(staff.image)
                          : undefined
                      }
                      alt={staff.name}
                      sx={{ width: 62, height: 62 }}
                    />
                    <Typography
                      variant="body2"
                      fontSize={10}
                      width={"100%"}
                      noWrap
                    >
                      {staff.name}
                    </Typography>
                  </Stack>
                </Tooltip>
              ))}
          </Stack>
          <Stack>
            <Button
              variant="outlined"
              onClick={() => setIsAddStaff(!isAddStaff)}
            >
              اضافه کردن اعضا
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SelectStaff;
