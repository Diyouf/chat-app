const Connection = require("../models/connection.model");
const mongoose = require("mongoose");

// Combined route to check for existing connection or create a new one
const handleConnection = async (req, res) => {
  try {
    const participantIds = req.body;

    if (!participantIds || !Array.isArray(participantIds)) {
      return res
        .status(400)
        .json({ message: "Invalid participantIds provided" });
    }

    const objectIdParticipantIds = participantIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Check for existing connection
    const existingConnection = await Connection.aggregate([
      { $match: { participants: { $all: objectIdParticipantIds } } },
    ]);

    if (existingConnection.length > 0) {
      return res.status(200).json(existingConnection[0]);
    } else {
      // Create a new connection
      const newConnection = new Connection({
        participants: objectIdParticipantIds,
      });

      await newConnection.save();

      return res.status(201).json(newConnection);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllConnections = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID provided" });
    }

    const objectId = new  mongoose.Types.ObjectId(id);

    const connections = await Connection.find({
      participants: objectId,
    }).populate("participants", "_id name");

    if (connections.length > 0) {
      return res.status(200).json(connections);
    } else {
      return res
        .status(404)
        .json({ message: "No connections found for this user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleConnection, getAllConnections };
