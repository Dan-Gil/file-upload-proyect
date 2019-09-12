const express = require('express');
const router = express.Router();
const multer = require('multer');
const Picture = require('../models/Picture');

/* GET home page */
router.get('/', async (req, res, next) => {
  const pictures = await Picture.find();
  res.render('index', {pictures});
});

const upload = multer({dest: './public/uploads'});

router.post('/upload', upload.single('photo'), async (req, res, next) => {
  try {
    await Picture.create({
      name: req.body.name,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    });
    console.log(req.file);

    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
