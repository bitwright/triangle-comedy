const mongoose = require('mongoose');
const { Schema } = mongoose;

const venueSchema = new Schema({
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a creator'
  },
  name: {
    type: String,
    trim: true,
    required: 'You must supply a venue name!'
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply venue coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply a venue address!'
    }
  },
  photo: String
}, {
  // Allow virtual fields to be passed with model in JSON and Obj form
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

venueSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'venue'
});

venueSchema.index({
  name: 'text',
  location: '2dsphere'
});

function autopopulate(next) {
  this.populate('events');
  next();
}

venueSchema.pre('find', autopopulate);
venueSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Venue', venueSchema);