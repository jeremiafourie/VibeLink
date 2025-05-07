const mongoose = require('mongoose');
const submissionSchema = new mongoose.Schema({
  name:    String,
  email:   String,
  message: String,
  created: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Submission', submissionSchema);
