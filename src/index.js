const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit("greet", "Welcome connected");

  socket.broadcast.emit("greet", "New user joined!");

  socket.on("sendText", (text, cb) => {
    const filter = new Filter();
    if (filter.isProfane(text)) {
      return cb("Profanity is not allowed");
    }

    io.emit("displayMsg", text);
    cb();
  });

  socket.on("sendLocation", (location, callback) => {
    io.emit(
      "locationMessage",
      `https://google.com/maps?q=${location.latitude},${location.longitude}`
    );
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("displayMsg", "User has left!");
  });
});

app.get("/", function (req, res) {
  res.send();
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!!!`);
});
