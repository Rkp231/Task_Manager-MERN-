const express = require("express");
const cors = require("cors");
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({
  origin:["https://task-manager-mern-api-ivory.vercel.app"],
  methods:["POST","GET","PUT","DELETE"],
  credentials:true
}));
app.use(bodyParser.json());
app.use("/tasks", TaskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT};`);
});
