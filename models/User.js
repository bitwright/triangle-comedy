const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
  googleId: String,
});

userSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('User', userSchema);