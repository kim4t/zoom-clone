const messegeList = document.querySelector("ul");
const messageForm = document.querySelector("#msg");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

const makeMsg = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

socket.addEventListener("open", () => {
  console.log("Connected to Browswer ✔");
});
socket.addEventListener("message", (m) => {
  const li = document.createElement("li");
  li.innerText = m.data;
  messegeList.append(li);
  console.log("New msg:", m.data);
});
socket.addEventListener("close", () => {
  console.log("closed ❌");
});

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMsg("msg", input.value));
  messageForm.reset();
};

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMsg("nick", input.value));
  nickForm.reset();
};
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
