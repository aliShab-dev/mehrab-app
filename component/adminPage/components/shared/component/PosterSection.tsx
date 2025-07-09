import { Box, Button, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { StyledTextField } from "./InputField";
import { Dayjs } from "dayjs";
import { toPersianDigits } from "@/app/util/numberHandler";

interface PosterSectionProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  openTimer: boolean;
  handleButtonClick: () => void;
  episod: number | "";
  handleEpisod: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenTimer: (isOpen: boolean) => void;
  selectedTime: Dayjs | null;
  handleChangeTimer: (newValue: Dayjs | null) => void;
  poster: File | null;
  setPoster: (file: File | null) => void;
  handleClose: () => void;
}

const PosterSection = ({
  poster,
  setPoster,
  buttonRef,
  openTimer,
  setOpenTimer,
  selectedTime,
  handleChangeTimer,
  episod,
  handleEpisod,
  handleButtonClick,
  handleClose
}: PosterSectionProps) => {
  return (
    <Stack direction={"row"} gap={2}>
      <Stack width={"33%"}>
        <Button
          component="label"
          variant={poster ? "contained" : "outlined"}
          sx={{ height: "100%", color: poster ? "white" : "primary" }}
        >
          {poster ? "پوستر انتخاب شده" : "انتخاب پوستر کنید"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPoster(file);
              }
            }}
          />
        </Button>
      </Stack>
      <Stack width={"33%"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box height={"100%"}>
            <Button
              ref={buttonRef}
              fullWidth
              onClick={handleButtonClick}
              variant="outlined"
              sx={{ height: "100%" }}
            >
              {selectedTime
                ? `زمان انتخاب شده: ${toPersianDigits(
                    selectedTime.format("HH:mm")
                  )}  `
                : "زمان کار را انتخاب کنید"}
            </Button>

            <TimePicker
              open={openTimer}
              onOpen={() => setOpenTimer(true)}
              onClose={handleClose}
              value={selectedTime}
              onChange={handleChangeTimer}
              ampm={false}
              slotProps={{
                textField: {
                  style: { display: "none" }, // completely hide the input
                },
                popper: {
                  anchorEl: buttonRef.current, // <-- anchor popup to button
                },
              }}
            />
          </Box>
        </LocalizationProvider>
      </Stack>
      <Stack width={"33%"}>
        <StyledTextField
          label="قسمت کار را وارد کنید"
          type="number"
          value={episod}
          onChange={handleEpisod}
          slotProps={{
            htmlInput: {
              inputMode: "numeric",
              pattern: "[1-9]*",
              min: 1,
              step: 1,
            },
          }}
        />
      </Stack>
    </Stack>
  );
};


export default PosterSection;