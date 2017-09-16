const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const requireLogin = require('../middlewares/requireLogin');

const multerOptions = {
  store: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
}

const upload = multer(multerOptions).single('photo');

const resize = async (req, res, next) => { 
  if (!req.file) return next();
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./client/public/uploads/${req.body.photo}`);
  next();
};

async function createEvent(eventType, req, res) {
  req.body.creator = req.user.id;
  req.body.category = eventType;
  req.body.time = new Date(req.body.time);
  const event = new Event(req.body);

  try {
    await event.save();
    res.status(200).send({});
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
  app.post('/api/events/shows', 
    requireLogin,
    upload,
    resize,
    async (req, res) => {
      const show = createEvent('show', req, res);
  });

  // Get all mics
  app.get('/api/events/mics', async (req, res) => {
    const mics = await Event.find({ category: 'mic' });
    res.json(mics);
  });

  // Create new mic
  app.post('/api/events/mics',
    requireLogin,
    upload,
    resize,
    async (req, res) => {
      const mic = createEvent('mic', req, res);
  });

  // Get all classes
  app.get('/api/events/classes', async (req, res) => {
    const classes = await Event.find({ category: 'class' });
    res.json(classes);
  });
  
  // Create new class
  app.post('/api/events/classes',
    requireLogin,
    upload,
    resize,
    async (req, res) => {
      const newClass = createEvent('class', req, res);
  });
};