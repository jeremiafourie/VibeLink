const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An event must have a title'],
    trim: true,
    maxlength: [100, 'Title must be at most 100 characters']
  },
  description: {
    type: String,
    required: [true, 'An event must have a description'],
    trim: true,
    maxlength: [1000, 'Description must be at most 1000 characters']
  },
  date: {
    type: Date,
    required: [true, 'An event must have a date']
  },
  location: {
    type: String,
    required: [true, 'An event must have a location'],
    trim: true
  },
  eventCategory: {
    type: String,
    enum: {
      values: ['Workshop', 'Community', 'Family'],
      message: 'Category must be either: Workshop, Community or Family'
    },
    required: [true, 'An event must have a category']
  },
  image: {
    type: String,
    trim: true,
    // match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, 'Please provide a valid image URL'], TODO: update regex pattern to match our string
    default: 'https://example.com/default-event.jpg'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
