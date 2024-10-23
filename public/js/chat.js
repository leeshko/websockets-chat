const socket = io();

socket.on("greet", (e) => console.log(e, "Welcome!"));

const textForm = document.getElementById("message-form");

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = e.target.elements.message.value;
  socket.emit("sendText", inputText);
});

socket.on("displayMsg", (msg) => {
  console.log(msg);
});

document.getElementById("send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your brouser!");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
  });
});
