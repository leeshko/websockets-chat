const socket = io();

const incrementButton = document
  .getElementById("increment")
  .addEventListener("click", () => {
    console.log("clicked");
    socket.emit("increment");
  });

socket.on("countUpdated", (count) => {
  console.log("Count has been updated", count);
});
