const express = require("express");
const {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
} = require("../Controllers/TaskController");
const router = express.Router();

router.get("/", getAllTask);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
