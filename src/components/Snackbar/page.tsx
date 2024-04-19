import { Snackbar, Alert } from "@mui/material";

type SnackbarMessageProps = {
  openSnackbar: boolean;
  setOpenSnackbar: (open: boolean) => void;
  snackbarMessage: string;
};

export default function SnackbarMessage({
  openSnackbar,
  setOpenSnackbar,
  snackbarMessage,
}: SnackbarMessageProps) {
  const vertical = "top";
  const horizontal = "center";
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
