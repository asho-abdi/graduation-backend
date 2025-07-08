const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  group: String,
  titles: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TitleSubmission' }],
    validate: {
      validator: arr => arr.length <= 3,
      message: 'A student can submit up to 3 titles'
    }
  }
});

module.exports = mongoose.model('Student', studentSchema);
