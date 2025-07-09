"use client";

import { alpha, Stack } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  {
    id: 1,
    actionType: "Data Grid",
    actionTime: "the Community version",
    actionDescription: "added image",
    byWho: "admin 1",
  },
  {
    id: 2,
    actionType: "شسیبشسیبشسیب   ",
    actionTime: "the Pro version",
    actionDescription: "added audio",
    byWho: "admin 1",
  },
  {
    id: 3,
    actionType: "Data Grid Premium",
    actionTime: "the Premium version",
    actionDescription: "deleted image",
    byWho: "admin 2",
  },
];

const columns: GridColDef[] = [
  { field: "actionType", headerName: "نوع تغییر", width: 200 },
  { field: "actionTime", headerName: "زمان تغییر", width: 300 },
  { field: "actionDescription", headerName: "توضیحات تغییر", width: 300 },
  { field: "byWho", headerName: "ادمین", width: 300 },
];

const Report = () => {
  return (
    <Stack width={"100%"} height={500}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={(theme) => ({
          border: `2px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
          borderRadius: 2,
          direction: "rtl",
          textAlign: "right",
          "& .MuiDataGrid-columnHeaders": {
            color: theme.palette.secondary.main,
            fontWeight: "bold",
            fontSize: "1rem",
          },
          "& .MuiDataGrid-cell": {
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          },
          "&::-webkit-scrollbar-button": {
            display: "none",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.default,
          },
          "&::-webkit-scrollbar": {
            width: 8,
            height: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 4,
          },
          scrollbarWidth: "thin",
          scrollbarColor: `${alpha(theme.palette.secondary.light, 0.8)} ${
            theme.palette.background.default
          }`,
        })}
      />
    </Stack>
  );
};

export default Report;
