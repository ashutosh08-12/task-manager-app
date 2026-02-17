import { useState } from "react";
import { createTask } from "../services/taskService";
import { toast } from "react-toastify";

export default function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(task);

      toast.success("Task Created ✅");

      setTask({ title: "", description: "" });

      window.location.reload();
    } catch {
      toast.error("Error creating task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6"
    >
      <input
        name="title"
        placeholder="Task title..."
        value={task.title}
        onChange={handleChange}
        className="flex-1 border p-2 rounded-lg"
        required
      />

      <input
        name="description"
        placeholder="Description..."
        value={task.description}
        onChange={handleChange}
        className="flex-1 border p-2 rounded-lg"
      />

      <button className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700">
        Add
      </button>
    </form>
  );
}
