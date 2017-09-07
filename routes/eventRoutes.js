const mongoose = require('mongoose');
const Event = mongoose.model('Event');

async function createEvent(eventType, req, res) {
  const { name, description, time, venue, photo } = req.body;

  const event = await new Event({
    name,
    description,
    time,
    venue,
    photo,
    category: eventType
  });

  try {
    await event.save();
    res.json(user);
  } catch(err) {
    res.status(422).json(err);
  }
}

module.exports = app => {
  // Get all events
  app.get('/api/events', async (req, res) => {
    const events = await Event.find({});
    res.json(events);
  });

  // Get all shows
  app.get('/api/events/shows', async (req, res) => {
    const shows = await Event.find({ category: 'show' });
    res.json(shows);
  });

  // Create new show
  app.post('/api/events/shows', async (req, res) => {
    const show = createEvent('show', req, res);
  });

  // Get all mics
  app.get('/api/events/mics', async (req, res) => {
    const mics = await Event.find({ category: 'mic' });
    res.json(mics);
  });

  // Create new mic
  app.post('/api/events/mics', async (req, res) => {
    const mic = createEvent('mic', req, res);
  });

  // Get all classes
  app.get('/api/events/classes', async (req, res) => {
    const classes = await Event.find({ category: 'class' });
    res.json(classes);
  });
  
  // Create new class
  app.post('/api/events/classes', async (req, res) => {
    const newClass = createEvent('class', req, res);
  });
};