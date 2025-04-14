const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const messageRoutes = require("./Routes/messageRoutes");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { init } = require("./socket");

const app = express();
const server = createServer(app);
const io = init(server);
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join-room", (username) => {
    socket.join(username);
    console.log(`${username} joined the room`);
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.use(
  cors({
    origin: "https://ping-me-a-live-chat-app.onrender.com",
    credentials: true,
  })
);
dotenv.config();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

mongoose.connect(URL).then(console.log("Connected."));
server.listen(PORT);

app.use("/user", userRoutes);
app.use("/messages", messageRoutes);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || err.status || 500;

  if (typeof statusCode !== "number" || statusCode < 100 || statusCode > 599) {
    console.error("Invalid status code:", statusCode);
    statusCode = 500;
  }

  const errMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message:
      process.env.NODE_ENV === "production"
        ? errMessage
        : errMessage + (err.stack ? `\n${err.stack}` : ""),
  });
});
