import "./App.css";
import Container from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Task from "./Task";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [alignment, setAlignment] = useState("all");
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [addIunputs, setAddInputs] = useState({
    title: "",
    desc: "",
  });

  const [data, setData] = useState([
    {
      id: uuidv4(),
      taskTitle: "المهمة الأولي",
      taskDetails: "التفاصيل الخاصة بالمهمة الأولي",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      taskTitle: "المهمة الثانية",
      taskDetails: "التفاصيل الخاصة بالمهمة الثانية",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      taskTitle: "المهمة الثالثة",
      taskDetails: "التفاصيل الخاصة بالمهمة الثالثة",
      isCompleted: false,
    },
  ]);

  const handleAlignment = (event, newAlignment) => {
    newAlignment && setAlignment(newAlignment);
  };

  const handleAddNewTask = () => {
    if (addIunputs.title && addIunputs.desc) {
      setData([
        ...data,
        {
          id: uuidv4(),
          taskTitle: addIunputs.title,
          taskDetails: addIunputs.desc,
          isCompleted: false,
        },
      ]);
      handleClose();
    }
  };

  const handleEditTask = ({ id, title, desc }) => {
    const index = data.findIndex((ele) => ele.id === id);
    const newData = [...data];
    newData[index] = {
      id: id,
      taskTitle: title,
      taskDetails: desc,
      isCompleted: false,
    };
    setData(newData);
  };

  const handleRemoveTask = (id) => {
    const index = data.findIndex((ele) => ele.id === id);
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const controlTaskCompletion = (id) => {
    const index = data.findIndex((ele) => ele.id === id);
    const newData = [...data];
    newData[index].isCompleted = !newData[index].isCompleted;
    setData(newData);
  };

  const renderItems = () => {
    let tasks = [];
    if (alignment === "all") {
      tasks = data;
    } else if (alignment === "fulfilled") {
      tasks = data.filter((ele) => ele.isCompleted);
    } else {
      tasks = data.filter((ele) => !ele.isCompleted);
    }
    return tasks.map((ele) => (
      <Task
        key={ele.id}
        id={ele.id}
        taskTitle={ele.taskTitle}
        taskDetails={ele.taskDetails}
        controlTaskCompletion={controlTaskCompletion}
        handleRemoveTask={handleRemoveTask}
        handleEditTask={handleEditTask}
        isCompleted={ele.isCompleted}
      />
    ));
  };

  const handleOpen = () => {
    setOpenDialog(true);
    setAddInputs({ title: "", desc: "" });
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          mx: "auto",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Card
          raised
          sx={{
            flex: 1,
            borderRadius: "25px",
            background: "#c5cae9",
            height: "90%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  textAlign: "center",
                  color: theme.palette.primary.main,
                }}
              >
                مهامي
              </Typography>
            }
          />
          <Divider
            variant="middle"
            sx={{ background: theme.palette.custom.light }}
          />
          <CardContent sx={{ flex: 1, minHeight: 0, position: "relative" }}>
            <Stack
              spacing={3}
              sx={{
                height: "100%",
                alignItems: "center",
              }}
            >
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                sx={{
                  direction: "ltr",
                }}
              >
                <ToggleButton
                  value="all"
                  sx={{
                    border: `1px solid ${theme.palette.custom.light}`,
                    "&.Mui-selected": { background: "#9fa8da" },
                    "&:hover": {
                      background: "rgba(159, 168, 218,0.3) !important",
                    },
                    "&.Mui-selected:hover": {
                      background: "#9fa8da !important",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    الكل
                  </Typography>
                </ToggleButton>

                <ToggleButton
                  value="fulfilled"
                  sx={{
                    border: `1px solid ${theme.palette.custom.light}`,
                    "&.Mui-selected": { background: "#9fa8da" },
                    "&:hover": {
                      background: "rgba(159, 168, 218,0.3) !important",
                    },
                    "&.Mui-selected:hover": {
                      background: "#9fa8da !important",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    منجز
                  </Typography>
                </ToggleButton>
                <ToggleButton
                  value="unfulfilled"
                  sx={{
                    border: `1px solid ${theme.palette.custom.light}`,
                    "&.Mui-selected": { background: "#9fa8da" },
                    "&:hover": {
                      background: "rgba(159, 168, 218,0.3) !important",
                    },
                    "&.Mui-selected:hover": {
                      background: "#9fa8da !important",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    غير منجز
                  </Typography>
                </ToggleButton>
              </ToggleButtonGroup>

              <Stack
                spacing={2}
                sx={{
                  flex: 1,
                  width: "100%",
                  overflowY: "auto",
                  padding: "5px",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#ddd",
                    borderRadius: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#9fa8da",
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#7986cb",
                  },
                }}
              >
                {renderItems()}
              </Stack>
            </Stack>
            <Fab
              aria-label="add"
              onClick={handleOpen}
              sx={{
                background: theme.palette.custom.light,
                transition: "all 0.3s ease",
                position: "absolute",
                bottom: "15px",
                left: "15px",
                zIndex: 1,
                "&:hover": {
                  background: theme.palette.custom.main,
                  transform: "translateY(-3px)",
                },
              }}
            >
              <AddIcon />
            </Fab>
          </CardContent>
        </Card>
      </Container>

      <Dialog open={openDialog} onClose={handleClose}>
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
            value={addIunputs.title}
            onChange={(e) =>
              setAddInputs({ ...addIunputs, title: e.target.value })
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
            value={addIunputs.desc}
            onChange={(e) =>
              setAddInputs({ ...addIunputs, desc: e.target.value })
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
          <Button onClick={handleAddNewTask}>حفظ</Button>
          <Button onClick={handleClose}>إلغاء</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
