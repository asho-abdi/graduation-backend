const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
  
});

module.exports = mongoose.model('Faculty', facultySchema);
