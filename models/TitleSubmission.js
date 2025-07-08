// models/TitleSubmission.js
const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // description field removed as it’s no longer used
  group: {
    type: String,
    default: 'Group A'
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supervisor'
  },
  evaluation: {
    proposalPoints: Number,
    thesisPoints: Number,
    supervisorPoints: Number,
    totalMarks: Number,
    comment: String,
    evaluatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supervisor'
    },
    evaluatedAt: Date
  }
}, {
  timestamps: true   // adds createdAt & updatedAt
});

module.exports = mongoose.model('TitleSubmission', titleSchema);
