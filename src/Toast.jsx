import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Toast({ open, handleClose, toastMessage }) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert variant="filled" severity="success">
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
