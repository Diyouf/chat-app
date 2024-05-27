const express = require("express");
const userRouter = express.Router();
const { getUser, getAllUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

userRouter.get("/get/:id", authMiddleware, getUser);
userRouter.get("/getAlluser/:id", authMiddleware, getAllUser);

module.exports = userRouter;
