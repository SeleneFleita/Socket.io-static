import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const serverPort = 4000;
const server = createServer(app);

const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

app.post("/", (req, res) => res.send("Server running"));
io.on("connection", (socket) => {
  console.log("Cliente conectado ->", socket.id);
  socket.on("chat-message", (data) => {
    io.emit("chat-message", data);
  });
  socket.on("disconned", () => {
    console.log("cliente desconectado");
  });
});

server.listen(serverPort, () =>
  console.log(`Servidor corriendo en el puerto ${serverPort}`)
);
