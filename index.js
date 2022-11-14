const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const helmet = require("helmet");
const config = require("./config");
const Projects = require("./routes/Projects");
const Users = require("./routes/Users");
const Sections = require("./routes/Sections");
const Tasks = require("./routes/Tasks");
const events = require("./scripts/events");
const path = require("path");

config();
events();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use(express.json());
app.use(helmet());
app.use(fileUpload());

app.use("/projects", Projects);
app.use("/users", Users);
app.use("/sections", Sections);
app.use("/tasks", Tasks);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
  connect();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connect();
});
