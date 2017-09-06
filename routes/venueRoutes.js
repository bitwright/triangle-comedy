const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // Get all venues
  app.get('/venues', async (req, res) => {
    const venues = Venue.find({});

    res.json(venues);
  });

  // Create new venue
  app.post('/venues', requireLogin, async (req, res) => {
    const { name, location, photo } = req.body;

    const venue = new Venue({
      creator: req.user.id,
      name,
      location,
      photo
    });

    try {
      await venue.save();
      res.json(req.user);
    } catch(err) {
      res.status(422).send(err);
    }
  });
};