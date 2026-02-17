const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title)
      return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({ title, description });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (Object.keys(req.body).length === 0) {
  return res.status(400).json({
    message: "Update data cannot be empty",
  });
}


  if (!task)
    return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (task.status !== "Completed") {
    return res.status(400).json({
      message:
        "Task must be completed before deleting",
    });
  }

  await task.deleteOne();

  res.json({
    message: "Task deleted successfully",
  });
};

