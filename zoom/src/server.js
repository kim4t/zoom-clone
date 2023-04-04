import express from "express";
import http from "http";
import WebSocket from "ws";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http:3000");

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browswer ✔");
  socket.on("close", () => {
    console.log("Disconnected ❌ from the Browswer");
  });
  socket.on("message", (msg) => {
    const parsed = JSON.parse(msg);
    switch (parsed.type) {
      case "msg":
        const message = `${socket["nickname"]}: ${parsed.payload.toString(
          "utf-8"
        )}`;
        sockets.forEach((s) => s.send(message));
        break;
      case "nick":
        socket["nickname"] = parsed.payload;
    }
  });
});

server.listen(3000, handleListen);
