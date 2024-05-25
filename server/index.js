const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

const AuthRouter = require("./routes/auth.routes");
const chatRouter = require("./routes/chat.routes")
const connectDB = require('./config/db');

app.use(express.json());

app.use("api/auth", AuthRouter);
app.use("api/chat", chatRouter);

connectDB()

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
