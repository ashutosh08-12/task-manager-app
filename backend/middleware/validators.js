const { body, param } = require("express-validator");
const mongoose = require("mongoose");

exports.taskValidation = [
  body("title")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 80 })
    .withMessage("Title must be between 3 and 80 characters"),

  body("description")
    .optional({ checkFalsy: true })
    .isLength({ min: 5, max: 300 })
    .withMessage("Description must be between 5 and 300 characters"),

  body("status")
    .optional()
    .isIn([ "Completed" , "Pending"])
    .withMessage("Invalid status value"),
];

exports.idValidation = [
  param("id").custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("Invalid Task ID");
    }
    return true;
  }),
];
