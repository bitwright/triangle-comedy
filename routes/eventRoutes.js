const mongoose = require('mongoose');
const Event = mongoose.model('Event');

async function createEvent(eventType, req, res) {
  const { name, description, time, venue, phot } = req.body;

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
  app.get('/events', async (req, res) => {
    const events = await Event.find({});
    res.json(events);
  });

  // Get all shows
  app.get('/events/shows', async (req, res) => {
    const shows = await Event.find({ category: 'show' });
    res.json(shows);
  });

  // Create new show
  app.post('/events/shows', async (req, res) => {
    const show = createEvent('show', req, res);
  });

  // Get all mics
  app.get('/events/mics', async (req, res) => {
    const mics = Event.find({ category: 'mic' });
    res.json(mics);
  });

  // Create new mic
  app.post('/events/mics', async (req, res) => {
    const mic = createEvent('mic', req, res);
  });

  // Get all classes
  app.get('/events/classes', async (req, res) => {
    const classes = Event.find({ category: 'class' });
    res.json(classes);
  });
  
  // Create new class
  app.post('/events/classes', async (req, res) => {
    const newClass = createEvent('class', req, res);
  });
};