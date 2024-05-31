const express = require("express");
const chatRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  handleConnection,
  getAllConnections,
  getAllMessages,
  getAllGroupConnections
} = require("../controllers/chatController");

chatRouter.post("/checkConnection", authMiddleware, handleConnection);
chatRouter.get("/getAllConnections/:id", authMiddleware, getAllConnections);
chatRouter.get("/getAllGroupConnections/:id", authMiddleware, getAllGroupConnections);
chatRouter.get("/getAllMessages/:id", authMiddleware, getAllMessages);

module.exports = chatRouter;
