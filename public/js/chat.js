const socket = io();

socket.on("greet", (e) => console.log(e, "Welcome!"));

const textForm = document.getElementById("message-form");
const messageFormInput = textForm.querySelector("input");
const messageFormButton = textForm.querySelector("button");

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageFormButton.setAttribute("disabled", "disabled");

  const inputText = e.target.elements.message.value;

  socket.emit("sendText", inputText, (error) => {
    messageFormButton.removeAttribute("disabled");
    messageFormInput.value = "";
    messageFormInput.focus();

    if (error) {
      return console.log(error);
    }
    console.log("Message delivered");
  });
});

socket.on("displayMsg", (msg) => {
  console.log(msg);
});

document.getElementById("send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your brouser!");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("Location shared");
      }
    );
  });
});
