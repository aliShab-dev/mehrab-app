import { Box, Button, Skeleton, Stack } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

type PaginationType = {
  page: number;
  setPage: (value: number) => void;
  pageCount: number;
  loading: boolean;
  showAll: boolean;
  setShowAll: (value: boolean) => void;
};

const Pagination = ({
  page,
  setPage,
  pageCount,
  loading,
  showAll,
  setShowAll,
}: PaginationType) => {
  const toPersianNumber = (n: number): string =>
    n.toString().replace(/\d/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

  const nextPage = () => {
    setPage(page >= pageCount ? 1 : page + 1);
  };

  const prevPage = () => {
    setPage(page <= 1 ? pageCount : page - 1);
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="center" mt={4}>
      {loading ? (
        <Stack gap={2} alignItems={"center"}>
          <Skeleton
            animation={"wave"}
            variant="rounded"
            width={150}
            height={32}
          />
          <Skeleton variant="rounded" width={200} height={36} />
        </Stack>
      ) : (
        <Stack gap={2}>
          <Button
            onClick={() => {
              setShowAll(showAll ? false : true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disableRipple
            sx={{
              borderRadius: 5,
              fontSize: { xs: 16, sm: 18, md: 20 },
              pb: 1,
              pt: 0.5,
              lineHeight: 1.2,
              color: (theme) => theme.palette.secondary.main,
              bgcolor: "#fff",
              boxShadow: (theme) =>
                `0px 1px 10px -5px ${theme.palette.secondary.main}`,
              "&:hover": {
                boxShadow: (theme) =>
                  `0px 3px 10px -3px ${theme.palette.secondary.main}`,
                bgcolor: "transparent",
              },
            }}
          >
            {showAll ? "نمایش صفحه بندی" : "موارد بیشتر"}
          </Button>
          {!showAll && (
            <Stack
              direction={"row"}
              gap={1}
              sx={{
                justifyContent: 'center',
                position: "relative",
                borderRadius: 5,
                px: 2,
                bgcolor: "#fff",
                boxShadow: (theme) =>
                  `0px 1px 10px -5px ${theme.palette.secondary.main}`,
              }}
            >
              <Button
                disableRipple
                onClick={prevPage}
                sx={{
                  position: "absolute",
                  right: -50,
                  "&:hover": { bgcolor: "transparent" },
                }}
              >
                <KeyboardDoubleArrowRightIcon />
              </Button>
              <Button
                disableRipple
                onClick={nextPage}
                sx={{
                  position: "absolute",
                  left: -50,
                  "&:hover": { bgcolor: "transparent" },
                }}
              >
                <KeyboardDoubleArrowLeftIcon />
              </Button>
              {Array.from({ length: pageCount }, (_, index) => (
                <Box
                  key={index}
                  onClick={() => setPage(index + 1)}
                  sx={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    color: page === index + 1 ? "secondary.main" : "#ccc",
                    fontSizeq: { xs: 14, sm: 16, md: 18 },
                    fontWeight: page === index + 1 ? "bold" : "normal",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#aaa",
                    },
                  }}
                >
                  {toPersianNumber(index + 1)}
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Pagination;
