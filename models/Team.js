const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  role:  { type: String, required: true, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamMemberSchema);
