import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { createTask, DeleteTaskById, getAllTasks, UpdateTaskById } from "./api";
import { notify } from "./utils";

function TaskManager() {
  const obj = { taskName: "", isDone: false };

  const [taskInput, settaskInput] = useState(obj);
  const [taskList, settaskList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateTask, setUpdateTask] = useState(null);

  const handleInputTask = (e) => {
    settaskInput({ ...taskInput, taskName: e.target.value });
  };

  const handleTask = () => {
    if (updateTask && taskInput.taskName) {
      //upadte api call
      console.log("update api call");
      const obj = {
        taskName: taskInput.taskName,
        isDone: updateTask.isDone,
        _id: updateTask._id,
      };
      handleUpdateItem(obj);
    } else if (updateTask === null && taskInput.taskName) {
      console.log("create api call");
      //create api call
      handleAddTask();
    }
    settaskInput((prevState) => ({
      ...prevState,
      taskName: "",
    }));
  };

  useEffect(() => {
    if (updateTask) {
      settaskInput({ ...taskInput, taskName: updateTask.taskName });
    }
  }, [updateTask]);

  const handleAddTask = async () => {
    try {
      const { success, message } = await createTask(taskInput);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      settaskInput((prevState) => ({
        ...prevState,
        taskName: "",
      }));
      fetchAllTask();
    } catch (error) {
      console.error(error);
      notify("Failed to create task", "error");
    }
  };

  const fetchAllTask = async () => {
    try {
      const { data } = await getAllTasks();
      if (data) settaskList(data);
      console.log(taskList);

      //setCopyTasks(data);
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };
  useEffect(() => {
    fetchAllTask();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTask();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const handleCheckAndUncheck = async (task) => {
    const { _id, isDone, taskName } = task;
    const obj = {
      taskName,
      isDone: !isDone,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTask();
    } catch (err) {
      console.error(err);
      notify("Failed to update task", "error");
    }
  };

  const handleUpdateItem = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: isDone,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      setUpdateTask(null);
      fetchAllTask();
    } catch (err) {
      console.error(err);
      notify("Failed to Update task", "error");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = searchTerm
    ? taskList.filter((task) =>
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : taskList;

  return (
    <>
      <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
        <h1 className="mb-4">Task Manager</h1>
        <div className="d-flex justify-content-between align-items-center mb-4 w-100">
          <div className="input-group flex-grow-1 me-2">
            <input
              type="text"
              className="form-control me-1"
              value={taskInput.taskName}
              onChange={handleInputTask}
              placeholder="Add Task"
            />
            <button onClick={handleTask} className="btn btn-success btnsm me-2">
              <FaPlus className="m-2" />
            </button>
          </div>
          <div className="input-group flex-grow-1">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              onChange={handleSearch}
              value={searchTerm}
              type="text"
              className="form-control"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="d-flex flex-column w-100">
          {filteredTasks.length > 0 &&
            filteredTasks.map((task) => {
              return (
                <div
                  key={task._id}
                  className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center"
                >
                  <span
                    className={
                      task.isDone ? "text-decoration-line-through" : ""
                    }
                  >
                    {task.taskName}
                  </span>
                  <div className="">
                    <button
                      onClick={() => handleCheckAndUncheck(task)}
                      className="btn btn-success btn-sm me-2"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => setUpdateTask(task)}
                      className="btn btn-primary btn-sm me-2"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="btn btn-danger btn-sm me-2"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
      </div>
    </>
  );
}

export default TaskManager;
