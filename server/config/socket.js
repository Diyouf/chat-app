const { default: mongoose } = require("mongoose");
const Message = require("../models/chat.model");

let io;

const setupSocket = (socketIo) => {
  io = socketIo;

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("sendMessage", async (messageData) => {
      try {
        const message = new Message({
          connection: new mongoose.Types.ObjectId(messageData.connectionId),
          to: new mongoose.Types.ObjectId(messageData.to),
          content: messageData.content,
          from: new mongoose.Types.ObjectId(messageData.from),
        });
        await message.save();
        // Emit the saved message to all connected clients
        io.emit("newMessage", message);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });
  });
};

module.exports = { setupSocket };
