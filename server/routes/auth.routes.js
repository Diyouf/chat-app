const express = require("express");
const { signup, login } = require("../controllers/authController");
const AuthRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);

AuthRouter.get("/protected", authMiddleware, (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "You have accessed a protected route!" });
});

module.exports = AuthRouter;
