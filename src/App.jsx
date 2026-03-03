import "./App.css";
import Container from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Task from "./Task";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [alignment, setAlignment] = useState("all");
  const theme = useTheme();
  const [inputValue, setInputValue] = useState("");
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
    setAlignment(newAlignment);
  };

  const handleAddNewTask = () => {
    inputValue &&
      setData([
        ...data,
        {
          id: uuidv4(),
          taskTitle: "المهمة الثالثة",
          taskDetails: inputValue,
          isCompleted: false,
        },
      ]);
    setInputValue("");
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
          <CardContent sx={{ flex: 1, minHeight: 0 }}>
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
                  paddingRight: 1,

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

              <Grid container spacing={1} sx={{ width: "100%" }}>
                <Grid size={9}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="عنوان المهمة"
                    color="custom"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
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
                </Grid>
                <Grid container size={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="custom"
                    onClick={handleAddNewTask}
                    sx={{ padding: "0 40px !important" }}
                  >
                    إضافة
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;
