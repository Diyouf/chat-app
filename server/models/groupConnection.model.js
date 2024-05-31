const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const groupConnectionSchema = new Schema({
  groupName:{
    type: 'string',
    required: true
  },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
}, { collection: 'groupConnections' });

const groupConnection = model('groupConnections', groupConnectionSchema);

module.exports = groupConnection;