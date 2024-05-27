const express = require("express");
const chatRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  handleConnection,
  getAllConnections,
} = require("../controllers/chatController");

chatRouter.post("/checkConnection", authMiddleware, handleConnection);
chatRouter.get("/getAllConnections/:id", authMiddleware, getAllConnections);

module.exports = chatRouter;
