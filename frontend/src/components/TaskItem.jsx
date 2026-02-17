import { useState } from "react";
import { updateTask, deleteTask } from "../services/taskService";
import { toast } from "react-toastify";

export default function TaskItem({ task, refresh }) {
  const [showModal, setShowModal] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleChange = (e) => {
    setUpdatedTask({
      ...updatedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    await updateTask(task._id, updatedTask);

    toast.success("Task Updated 🚀");

    setShowModal(false);
    refresh();
  };

  const removeTask = async () => {

  // ⭐ BUSINESS RULE CHECK
  if (task.status !== "Completed") {
    toast.error(
      "Task can only be deleted after completion ❗"
    );
    return;
  }

  try {
    await deleteTask(task._id);
    toast.success("Task Deleted ✅");
    refresh();
  } catch {
    toast.error("Failed to delete task");
  }
};


  return (
    <>
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm mb-4">
        <h2 className="text-lg font-semibold">
          {task.title}
        </h2>

        <p className="text-gray-600">
          {task.description}
        </p>

        <span
          className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
            task.status === "Completed"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {task.status}
        </span>

        <div className="flex gap-3 mt-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            Edit
          </button>

          <button
  onClick={removeTask}
  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
>
  Delete
</button>


        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">
              Edit Task
            </h2>

            <input
              name="title"
              value={updatedTask.title}
              onChange={handleChange}
              className="border p-2 w-full mb-3 rounded"
            />

            <input
              name="description"
              value={updatedTask.description}
              onChange={handleChange}
              className="border p-2 w-full mb-3 rounded"
            />

            <select
              name="status"
              value={updatedTask.status}
              onChange={handleChange}
              className="border p-2 w-full mb-4 rounded"
            >
              <option>Not-Started</option>
              <option>Completed</option>
              <option>Ongoing</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
