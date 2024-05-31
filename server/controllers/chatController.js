const Connection = require("../models/connection.model");
const chatModel = require("../models/chat.model");
const mongoose = require("mongoose");
const groupChatConnection = require("../models/groupConnection.model");
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

    const objectId = new mongoose.Types.ObjectId(id);

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

const getAllMessages = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID provided" });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const messages = await chatModel
      .find({ connection: objectId })
      .populate("from", "name")
      .populate("to", "name");

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllGroupConnections = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const connections = await groupConnection
      .find({ participants: id })
      .populate("participants");

    if (!connections) {
      return res.status(404).json({ message: "No group connections found" });
    }

    return res.status(200).json(connections);
  } catch (error) {
    console.error("Error fetching group connections:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createGroupConnection = async (req, res) => {
  try {
    const { groupName, participants } = req.body;

    // Validate groupName
    if (!groupName) {
      return res.status(400).json({ message: "Group name is required" });
    }

    // Validate participants
    if (!Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({ message: "Participants are required" });
    }

    // Ensure all participant IDs are valid ObjectIds
    const validParticipants = participants.every(
      (participant) => new mongoose.Types.ObjectId.isValid(participant)
    );
    if (!validParticipants) {
      return res.status(400).json({ message: "Invalid participant IDs" });
    }

    // Convert participant IDs to ObjectIds
    const participantObjectIds = participants.map(
      (participant) => new mongoose.Types.ObjectId(participant)
    );

    // Create a new group connection
    const newGroupConnection = new groupConnection({
      groupName,
      participants: participantObjectIds,
    });

    // Save the group connection to the database
    const savedGroupConnection = await newGroupConnection.save();

    // Respond with the created group connection
    return res.status(201).json(savedGroupConnection);
  } catch (error) {
    console.error("Error creating group connection:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleConnection,
  getAllConnections,
  getAllMessages,
  getAllGroupConnections,
  createGroupConnection
};
