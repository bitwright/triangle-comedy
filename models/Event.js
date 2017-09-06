const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'You must supply an event name!'
  },
  description: {
    type: String,
    trim: true
  },
  time: {
    type: Date,
    required: 'You mused supply an event time!'
  },
  venue: {
    type: Schema.ObjectId,
    ref: 'Venue',
    required: 'You must supply a venue!'
  },
  photo: String,
  category: {
    type: String,
    required: 'You must supply the type of event!'
  }
});

module.exports = mongoose.model('Event', eventSchema);
