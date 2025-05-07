const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  title:    String,
  date:     Date,
  location: String,
  image:    String
});
module.exports = mongoose.model('Event', eventSchema);
