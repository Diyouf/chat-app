const Connection = require("../models/connection.model"); // Adjust the path as needed
const mongoose = require("mongoose");
const getConnection = async (req, res) => {
  try {
    const { participantIds } = req.body;

    const objectIdParticipantIds = participantIds.map((id) =>
      mongoose.Types.ObjectId(id)
    );

    let existingConnection = await Connection.aggregate([
      { $match: { participants: { $all: objectIdParticipantIds } } },
      {
        $lookup: {
          from: "users",
          localField: "participants",
          foreignField: "_id",
          as: "participantsInfo",
        },
      },
    ]);

    if (existingConnection.length > 0) {
      return res.status(200).json(existingConnection[0]);
    } else {
      const newConnection = new Connection({
        participants: objectIdParticipantIds,
      });
      await newConnection.save();

      let newConnectionWithParticipants = await Connection.aggregate([
        { $match: { _id: newConnection._id } },
        {
          $lookup: {
            from: "users",
            localField: "participants",
            foreignField: "_id",
            as: "participantsInfo",
          },
        },
      ]);

      return res.status(201).json(newConnectionWithParticipants[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getConnection;
