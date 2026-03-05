import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function Popup({
  id,
  taskTitle,
  taskDetails,
  open,
  handleSaveChange,
  handleClose,
  title,
  initialInput,
  removeTask = false,
}) {
  const theme = useTheme();
  const [editIunputs, setEditInputs] = useState({
    title: initialInput ? taskTitle : "",
    desc: initialInput ? taskDetails : "",
  });

  const handleSaveEdit = () => {
    if (editIunputs.title && editIunputs.desc) {
      handleSaveChange({
        title: editIunputs.title,
        desc: editIunputs.desc,
        id,
      });
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      slotProps={{
        transition: {
          onEntering: () => {
            setEditInputs({
              title: initialInput ? taskTitle : "",
              desc: initialInput ? taskDetails : "",
            });
          },
        },
      }}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          background: removeTask ? "#ffebee" : "#c5cae9",
          color: removeTask
            ? theme.palette.error.main
            : theme.palette.primary.main,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          paddingTop: 0,
          paddingBottom: "0",
          background: removeTask ? "#ffebee" : "#c5cae9",
        }}
      >
        {!removeTask ? (
          <>
            <TextField
              autoFocus
              color="custom"
              margin="normal"
              value={editIunputs.title}
              onChange={(e) =>
                setEditInputs({ ...editIunputs, title: e.target.value })
              }
              label="عنوان المهمة"
              type="text"
              fullWidth
              variant="outlined"
              slotProps={{
                inputLabel: {
                  sx: { color: theme.palette.custom.main, opacity: 0.85 },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.custom.light,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: `${theme.palette.custom.main} !important`,
                },
              }}
            />
            <TextField
              margin="normal"
              color="custom"
              label="تفاصيل المهمة"
              value={editIunputs.desc}
              onChange={(e) =>
                setEditInputs({ ...editIunputs, desc: e.target.value })
              }
              type="text"
              fullWidth
              variant="outlined"
              slotProps={{
                inputLabel: {
                  sx: { color: theme.palette.custom.main, opacity: 0.85 },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.custom.light,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: `${theme.palette.custom.main} !important`,
                },
              }}
            />
          </>
        ) : (
          <DialogContentText sx={{ color: "#444" }}>
            لا يمكنك التراجع عن الحذف في حال اختيار زر (حذف)
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-start",
          background: removeTask ? "#ffebee" : "#c5cae9",
        }}
      >
        <Button
          color={removeTask ? "error" : "primary"}
          onClick={handleSaveEdit}
          disabled={
            removeTask ? false : !editIunputs.title || !editIunputs.desc
          }
        >
          {removeTask ? "حذف" : "حفظ"}
        </Button>
        <Button color={removeTask ? "error" : "primary"} onClick={handleClose}>
          إلغاء
        </Button>
      </DialogActions>
    </Dialog>
  );
}
