const mongoose = require('mongoose');
const Event = mongoose.model('Event');

module.exports = app => {
  // Get all events
  app.get('/events', (req, res) => {
    console.log(req.body);
    const event = Event.find({});
    res.json(event);
  });

  // Get all shows
  app.get('/events/shows', (req, res) => {
    console.log(req.body);
    const event = Event.find({ category: 'show' });
  });

  // Create new show
  app.post('/events/shows', (req, res) => {
    console.log(req.body);
  });

  // Get all mics
  app.get('/events/mics', (req, res) => {
    console.log(req.body);
    const event = Event.find({ category: 'mic' });
  });

  // Create new mic
  app.post('/events/mics', (req, res) => {
    console.log(req.body);
  });

  // Get all classes
  app.get('/events/classes', (req, res) => {
    console.log(req.body);
    const event = Event.find({ category: 'class' });
  });
  
  // Create new class
  app.post('/events/classes', (req, res) => {
    console.log(req.body);
  });
};