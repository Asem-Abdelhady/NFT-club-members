import express from "express";
import http from "http";
import { Server as SocketIoServer } from "socket.io";
import cors from "cors";
const app = express();
const server = http.createServer(app);
const io = new SocketIoServer(server);

//add cors
app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message: string) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
