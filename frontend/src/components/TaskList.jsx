import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.length === 0 && <p>No tasks yet...</p>}

      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          refresh={fetchTasks}
        />
      ))}
    </div>
  );
}
