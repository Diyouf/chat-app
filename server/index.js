const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const AuthRouter = require("./routes/auth.routes");
const chatRouter = require("./routes/chat.routes");
const userRouter = require("./routes/user.routes");
const connectDB = require('./config/db');
const { setupSocket } = require("./config/socket");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow requests from any origin, you can specify specific origins if needed
    methods: ["GET", "POST"] // Allow only GET and POST methods
  }
});

const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);

// Connect to the database
connectDB();

// Setup Socket.IO
setupSocket(io);

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
