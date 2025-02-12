import { createServer } from "http";
import { Server } from "socket.io";
import app from "../app.js";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"], // Allow socket methods
    credentials: true,
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  console.log(Object.keys(userSocketMap))
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("A user disconnected ", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
