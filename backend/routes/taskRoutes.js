const router = require("express").Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const {
  taskValidation,
  idValidation,
} = require("../middleware/validators");

const handleValidation = require("../middleware/handleValidation");

router.post("/", taskValidation, handleValidation, createTask);

router.put(
  "/:id",
  idValidation,
  taskValidation,
  handleValidation,
  updateTask
);

router.delete(
  "/:id",
  idValidation,
  handleValidation,
  deleteTask
);

router.get("/", getTasks);

module.exports = router;
