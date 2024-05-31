const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const GroupChatSchema = new Schema(
  {
    connection: {
      type: Schema.Types.ObjectId,
      ref: "groupConnection",
      required: true,
    },
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, default: Date.now },
    content: { type: String, required: true },
  },
  { collection: "groupChats" }
);

const GroupChats = model("groupChats", GroupChatSchema);

module.exports = GroupChats;
