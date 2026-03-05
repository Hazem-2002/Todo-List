import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "./Popup";

export default function Task({
  ele,
  controlTaskCompletion,
  handleRemoveTask,
  handleEditTask,
}) {
  const { id, taskTitle, taskDetails, isCompleted } = ele;
  const theme = useTheme();
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  const handleOpenEditPopup = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  const handleOpenDeletePopup = () => {
    setOpenDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
        background: theme.palette.custom.main,
        borderRadius: "3px",
        boxShadow: theme.shadows[3],
        transition: "all 0.2s ease",
        position: "relative",
        zIndex: 0,
        "&:hover": {
          transform: "translateY(-3px) scale(1.015)",
          boxShadow: theme.shadows[9],
          zIndex: 2,
        },
      }}
    >
      <Stack direction="row">
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              textDecoration: isCompleted ? "line-through" : "none",
              textDecorationColor: "#000",
            }}
          >
            {taskTitle}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textDecoration: isCompleted ? "line-through" : "none",
              textDecorationColor: "#000",
            }}
          >
            {taskDetails}
          </Typography>
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
            onClick={handleOpenEditPopup}
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
          <Popup
            taskTitle={taskTitle}
            taskDetails={taskDetails}
            id={id}
            open={openEditPopup}
            handleClose={handleCloseEditPopup}
            handleSaveChange={handleEditTask}
            title="تعديل المهمة"
            initialInput={true}
          />
          <IconButton
            color="error"
            size="small"
            // handleRemoveTask(id)
            onClick={handleOpenDeletePopup}
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

          <Popup
            taskTitle={taskTitle}
            taskDetails={taskDetails}
            id={id}
            open={openDeletePopup}
            handleClose={handleCloseDeletePopup}
            handleSaveChange={handleRemoveTask}
            title="هل أنت متأكد من حذف هذه المهمة؟"
            initialInput={true}
            removeTask={true}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
