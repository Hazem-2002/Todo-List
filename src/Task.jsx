import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Task({
  id,
  taskTitle,
  taskDetails,
  controlTaskCompletion,
  handleRemoveTask,
  handleEditTask,
  isCompleted,
}) {
  const theme = useTheme();
  const [completed, setCompleted] = useState(isCompleted);
  const [open, setOpen] = useState(false);
  const [editIunputs, setEditInputs] = useState({
    title: taskTitle,
    desc: taskDetails,
  });

  const handleClickOpen = () => {
    setOpen(true);
    setEditInputs({ title: taskTitle, desc: taskDetails });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
        background: theme.palette.custom.main,
        borderRadius: "3px",
        boxShadow: theme.shadows[6],
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px) scale(1.015)",
          boxShadow: theme.shadows[12],
        },
      }}
    >
      <Stack direction="row">
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" component="h5">
            {taskTitle}
          </Typography>
          <Typography variant="subtitle1">{taskDetails}</Typography>
        </Box>
        <Stack direction="row" sx={{ alignItems: "center", gap: "8px" }}>
          <IconButton
            onClick={() => {
              controlTaskCompletion(id);
              setCompleted(!completed);
            }}
            size="small"
            sx={{
              background: completed ? theme.palette.success.main : "#ddd",
              color: completed ? "#ddd" : theme.palette.success.main,
              transition: "all 0.3s ease",
              border: `1px solid ${theme.palette.success.main}`,
              "&:hover": {
                background: completed ? theme.palette.success.dark : "#c8e6c9",
                border: `1px solid ${theme.palette.success.main}`,
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            color="primary"
            size="small"
            onClick={handleClickOpen}
            sx={{
              background: "#ddd",
              transition: "all 0.3s ease",
              border: `1px solid ${theme.palette.primary.main}`,
              "&:hover": {
                background: "#c5cae9",
                border: `1px solid ${theme.palette.primary.main}`,
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleRemoveTask(id)}
            sx={{
              color: theme.palette.error.main,
              background: "#ddd",
              transition: "all 0.2s ease",
              border: `1px solid ${theme.palette.error.main}`,
              "&:hover": {
                background: "#ffccbc",
                border: `1px solid ${theme.palette.error.main}`,
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{ background: "#c5cae9", color: theme.palette.primary.main }}
        >
          تعديل المهمة
        </DialogTitle>
        <DialogContent
          sx={{ paddingTop: 0, paddingBottom: "0", background: "#c5cae9" }}
        >
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
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "flex-start", background: "#c5cae9" }}
        >
          <Button
            onClick={() => {
              handleEditTask({ ...editIunputs, id: id });
              handleClose();
            }}
          >
            حفظ
          </Button>
          <Button onClick={handleClose}>إلغاء</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
