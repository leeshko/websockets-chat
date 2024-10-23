const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit("greet", "Welcome connected");

  socket.broadcast.emit("greet", "New user joined!");

  socket.on("sendText", (text) => {
    io.emit("displayMsg", text);
  });

  socket.on('disconnect', () => {
    io.emit('displayMsg', 'User has left!')
  })
});

app.get("/", function (req, res) {
  res.send();
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!!!`);
});
