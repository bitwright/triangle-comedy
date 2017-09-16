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

const upload = multer(multerOptions).single('photo');

const resize = async (req, res, next) => {
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
  app.post('/api/venues',
    requireLogin, 
    upload,
    resize,
    async (req, res) => {
      req.body.creator = req.user.id;
      req.body.location = JSON.parse(req.body.location);
      const venue = new Venue(req.body); 

      try {
        await venue.save();
        res.status(200).send({});
      } catch(err) {
        res.status(422).send(err);
      }
  });
};
