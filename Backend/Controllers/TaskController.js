const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
  try {
    const body = req.body;
    const data = new TaskModel(body);
    await data.save();
    res.status(201).json({ message: "Task Created", success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to Create task", success: false });
  }
};

const getAllTask = async (req, res) => {
  try {
    const data = await TaskModel.find({});
    res.status(200).json({ message: "All Tasks Fetched", success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch all task", success: false });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    const data = await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "Task Updated", success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", success: false });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Tasks Deleted", success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", success: false });
  }
};
module.exports = { createTask, getAllTask, updateTask, deleteTask };
