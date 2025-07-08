const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  members: [{ type: String, required: true }],
  status: { type: String, default: 'Pending' } // Pending | Approved | Rejected
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
