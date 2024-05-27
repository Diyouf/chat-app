const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;

const AuthRouter = require("./routes/auth.routes");
const chatRouter = require("./routes/chat.routes")
const connectDB = require('./config/db');
const userRouter = require("./routes/user.routes");

app.use(express.json());
app.use(cors())

app.use("/api/auth", AuthRouter);
app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);

connectDB()

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
