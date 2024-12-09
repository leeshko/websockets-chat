const socket = io();

const textForm = document.getElementById("message-form");
const messageFormInput = textForm.querySelector("input");
const messageFormButton = textForm.querySelector("button");
const locationButton = document.getElementById("send-location");
const messages = document.getElementById("messages");

// Templates
const messageTemplate = document.getElementById("message-template").innerHTML;
const locationMessageTemplate = document.getElementById(
  "location-message-template"
).innerHTML;

socket.on("greet", (message) => {
  console.log("Welcome!", message);
});

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

socket.on("locationMessage", (url) => {
  console.log(url);
  const html = Mustache.render(locationMessageTemplate, { url });
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("displayMsg", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message,
  });
  messages.insertAdjacentHTML("beforeend", html);
});

locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your brouser!");
  }
  locationButton.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("Location shared");
        locationButton.removeAttribute("disabled");
      }
    );
  });
});
