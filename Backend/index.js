const express = require("express");
const cors = require("cors");
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/tasks", TaskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT};`);
});
