const express = require("express");
const chatRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const getConnection = require("../controllers/chatController");

chatRouter.post("/checkConnection", authMiddleware, getConnection);

module.exports = chatRouter;
