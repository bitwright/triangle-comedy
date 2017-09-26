const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const Venue = mongoose.model("Venue");

const eventSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "An event must have a creator!"
  },
  name: {
    type: String,
    trim: true,
    required: "You must supply an event name!"
  },
  description: {
    type: String,
    trim: true
  },
  time: {
    type: Date,
    required: "You mused supply an event time!"
  },
  venue: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
    required: "You must supply a venue!"
  },
  photo: String,
  category: {
    type: String,
    required: "You must supply the type of event!"
  }
});

function autopopulate(next) {
  this.populate({ path: "venue", select: "name" });
  next();
}

eventSchema.pre("find", autopopulate);
eventSchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Event", eventSchema);
