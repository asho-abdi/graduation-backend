const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }
});

module.exports = mongoose.model('Department', departmentSchema); // ✅ THIS LINE IS CRUCIAL
