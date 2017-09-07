const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const requireLogin = require('../middlewares/requireLogin');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};

function upload() {
  multer(multerOptions).single('photo');
}

async function resize(req, res, next) {
  if (!req.file) return next();

  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./client/public/uploads/${req.body.photo}`);
  next();
}

module.exports = app => {
  // Get all venues
  app.get('/api/venues', async (req, res) => {
    const venues = await Venue.find({});

    res.json(venues);
  });

  // Create new venue
  app.post('/api/venues', requireLogin, async (req, res) => {
    console.log(req.body);
    const { name, location, photo } = req.body;
    
    const venue = new Venue({
      creator: req.user.id,
      name,
      location,
      photo
    });


    try {
      await venue.save();
      res.status(200).send({});
    } catch(err) {
      res.status(422).send(err);
    }
  });
};