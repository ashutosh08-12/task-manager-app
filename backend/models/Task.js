const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Not-Started", "Completed" , "Ongoing"],
      default: "Not-Started",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
