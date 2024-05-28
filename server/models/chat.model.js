const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatSchema = new Schema(
  {
    connection: {
      type: Schema.Types.ObjectId,
      ref: "connection",
      required: true,
    },
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, default: Date.now },
    content: { type: String, required: true },
  },
  { collection: "chats" }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;
