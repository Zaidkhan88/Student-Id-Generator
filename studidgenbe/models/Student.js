const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  class: String,
  division: String,
  rackNumber: String,
  busRoute: String,
  allergies: [String],
  photo: String // Store base64 or URL
});

module.exports = mongoose.model('Student', studentSchema);
