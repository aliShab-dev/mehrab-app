import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface InputFieldProps {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  level: string;
  cat: string;
  handleChangeCat: (event: SelectChangeEvent<string>) => void;
  subCat: string[];
  isAddStaff: boolean;
  handleChangeLevel: (event: SelectChangeEvent<string>) => void;
  levels: string[];
  staffImage: File | null;
  setStaffImage: (file: File | null) => void;
  staffName: string;
  setStaffName: (name: string) => void;
  setStaffRole: (role: string) => void;
  staffRole: string;
  handleDeleteStaff: (name: string) => void;
  staffArray: { name: string; role: string; image: File | null }[];
  setStaffArray: (
    staff: { name: string; role: string; image: File | null }[]
  ) => void;
  setIsAddStaff: (isAdd: boolean) => void;
}

const InputField = ({
  name,
  setName,
  description,
  setDescription,
  level,
  cat,
  handleChangeCat,
  subCat,
  isAddStaff,
  handleChangeLevel,
  levels,
  staffImage,
  setStaffImage,
  setStaffName,
  handleDeleteStaff,
  setStaffRole,
  staffName,
  staffRole,
  setStaffArray,
  staffArray,
  setIsAddStaff,
}: InputFieldProps) => {
  return (
    <Stack width={"100%"} gap={1}>
      <TextField
        label="نام کار"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{
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
        label="توضیحات"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{
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
      <Stack direction={"row"} width={"100%"} gap={2}>
        <FormControl sx={{ minWidth: 120, width: "100%" }}>
          <InputLabel
            id="select-category-label"
            sx={{
              right: 35,
              left: "auto",
              transformOrigin: "top right",
              fontSize: 16,
            }}
          >
            سطع کار
          </InputLabel>

          <Select
            fullWidth
            labelId="select-category"
            id="select-category"
            value={level}
            label="سطح کار"
            onChange={handleChangeLevel}
            sx={{
              "& legend": {
                right: 30,
                textAlign: "right",
                fontSize: 15,
              },
            }}
          >
            {levels.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, width: "100%" }}>
          <InputLabel
            id="select-category-label"
            sx={{
              right: 35,
              left: "auto",
              transformOrigin: "top right",
              fontSize: 16,
            }}
          >
            دسته بندی
          </InputLabel>

          <Select
            fullWidth
            labelId="select-category"
            id="select-category"
            value={cat}
            label="دسته بندی"
            onChange={handleChangeCat}
            sx={{
              "& legend": {
                right: 30,
                textAlign: "right",
                fontSize: 15,
              },
            }}
          >
            {subCat.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack
        position={"relative"}
        height={"100%"}
        border={"1px solid #bbb"}
        borderRadius={2}
        p={1}
        mt={1}
        sx={{}}
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
          height={"100%"}
          overflow={"hidden"}
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
                    src={URL.createObjectURL(staffImage)}
                    alt="Preview"
                    sx={{
                      width: 100,
                      height: "auto",
                      aspectRatio: "4/5",
                      borderRadius: 1,
                      border: "1px solid #ccc",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 100,
                      aspectRatio: "4/5",
                      border: (theme) =>
                        `3px dotted ${theme.palette.primary.main}`,
                    }}
                  ></Box>
                )}
                <label htmlFor="upload-image">
                  <input
                    id="upload-image"
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
                  <Button size="small" variant="outlined" component="span">
                    ارسال عکس
                  </Button>
                </label>
              </Stack>
              <Stack gap={1} pt={1} width={"100%"}>
                <TextField
                  fullWidth
                  size="small"
                  label="نام عضو"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  sx={{
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
                  fullWidth
                  size="small"
                  label="مسئولیت عضو"
                  value={staffRole}
                  onChange={(e) => setStaffRole(e.target.value)}
                  sx={{
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
            top={0}
            right={0}
            sx={{
              gap: 2,
              transform: isAddStaff ? "translateX(100%)" : "translateX(0)",
              opacity: isAddStaff ? 0 : 1,
              transition: "transform 0.3s ease, opacity 0.3s ease",
            }}
          >
            <Stack
              height={110}
              direction={"row"}
              overflow={"auto"}
              sx={{ overflowX: "auto", overflowY: "hidden", gap: 1 }}
            >
              {staffArray.map((staff) => (
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
    </Stack>
  );
};

export default InputField;
