const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const connectionSchema = new Schema(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
  },
  { collection: "connections" }
);

const Connection = model("Connection", connectionSchema);

module.exports = Connection;
