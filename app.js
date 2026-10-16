const express = require("express");
const logger = require("./middleware/logger");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "TASKFLOW API is running!"
  });
});

module.exports = app;