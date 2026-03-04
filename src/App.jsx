import "./App.css";
import Container from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
import Popup from "./Popup";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [alignment, setAlignment] = useState("all");
  const theme = useTheme();
  const [open, setopen] = useState(false);
  // localStorage.setItem(
  //   "data",
  //   JSON.stringify([
  //     {
  //       id: uuidv4(),
  //       taskTitle: "المهمة الأولي",
  //       taskDetails: "التفاصيل الخاصة بالمهمة الأولي",
  //       isCompleted: false,
  //     },
  //     {
  //       id: uuidv4(),
  //       taskTitle: "المهمة الثانية",
  //       taskDetails: "التفاصيل الخاصة بالمهمة الثانية",
  //       isCompleted: false,
  //     },
  //     {
  //       id: uuidv4(),
  //       taskTitle: "المهمة الثالثة",
  //       taskDetails: "التفاصيل الخاصة بالمهمة الثالثة",
  //       isCompleted: false,
  //     },
  //   ]),
  // );

  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));

  const handleAlignment = (event, newAlignment) => {
    newAlignment && setAlignment(newAlignment);
  };

  const handleAddNewTask = ({ title, desc }) => {
    setData((prevData) => {
      const updated = [
        ...prevData,
        {
          id: uuidv4(),
          taskTitle: title,
          taskDetails: desc,
          isCompleted: false,
        },
      ];

      localStorage.setItem("data", JSON.stringify(updated));

      return updated;
    });
  };

  const handleEditTask = ({ id, title, desc }) => {
    setData((prevData) => {
      const updated = prevData.map((ele) =>
        ele.id === id
          ? {
              id: id,
              taskTitle: title,
              taskDetails: desc,
              isCompleted: ele.isCompleted,
            }
          : ele,
      );
      localStorage.setItem("data", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveTask = ({ id }) => {
    setData((prevData) => {
      const updated = prevData.filter((ele) => ele.id !== id);
      localStorage.setItem("data", JSON.stringify(updated));
      return updated;
    });
  };

  const controlTaskCompletion = (id) => {
    setData((prevData) => {
      const updated = prevData.map((ele) =>
        ele.id === id ? { ...ele, isCompleted: !ele.isCompleted } : ele,
      );
      localStorage.setItem("data", JSON.stringify(updated));
      return updated;
    });
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
        controlTaskCompletion={controlTaskCompletion}
        handleRemoveTask={handleRemoveTask}
        handleEditTask={handleEditTask}
        ele={ele}
      />
    ));
  };

  const handleOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
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

            <Popup
              open={open}
              handleClose={handleClose}
              handleSaveChange={handleAddNewTask}
              title="إضافة مهمة جديدة"
              initialInput={false}
            />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;
