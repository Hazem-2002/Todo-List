import { v4 as uuidv4 } from "uuid";

export default function TodoReducer(stateValue, action) {
  switch (action.type) {
    case "added": {
      const updated = [
        ...stateValue,
        {
          id: uuidv4(),
          taskTitle: action.payload.title,
          taskDetails: action.payload.desc,
          isCompleted: false,
        },
      ];

      localStorage.setItem("data", JSON.stringify(updated));

      return updated;
    }
    case "updated": {
      const updated = stateValue.map((ele) =>
        ele.id === action.payload.id
          ? {
              id: action.payload.id,
              taskTitle: action.payload.title,
              taskDetails: action.payload.desc,
              isCompleted: ele.isCompleted,
            }
          : ele,
      );
      localStorage.setItem("data", JSON.stringify(updated));
      return updated;
    }
    case "removed": {
      const updated = stateValue.filter((ele) => ele.id !== action.payload.id);
      localStorage.setItem("data", JSON.stringify(updated));
      return updated;
    }
    case "completed": {
      const updated = stateValue.map((ele) => {
        if (ele.id === action.payload.id) {
          return { ...ele, isCompleted: !ele.isCompleted };
        }
        return ele;
      });
      localStorage.setItem("data", JSON.stringify(updated));
      return updated;
    }
  }
}
