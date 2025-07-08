const mongoose = require('mongoose');

const supervisorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  assignedTitles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TitleSubmission' }]
});

module.exports = mongoose.model('Supervisor', supervisorSchema);
