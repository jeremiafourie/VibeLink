// routes/pageRoutes.js
const express = require('express');
const router  = express.Router();

const Team       = require('../models/Team');
const Event      = require('../models/Event');
const { submit } = require('../controllers/contactController');

// Home page – show 3 upcoming events
router.get('/', async (req, res, next) => {
  try {
    const upcomingEvents = await Event
      .find()
      .sort({ date: 1 })
      .limit(3);
    res.render('pages/home', {
      title: 'Home',
      upcomingEvents
    });
  } catch (err) {
    next(err);
  }
});

// About page – list team members
router.get('/about', async (req, res, next) => {
  try {
    const team = await Team.find();
    res.render('pages/about', {
      title: 'About',
      team
    });
  } catch (err) {
    next(err);
  }
});

// Events page – list all events
router.get('/events', async (req, res, next) => {
  try {
    const events = await Event
      .find()
      .sort({ date: 1 });
    res.render('pages/events', {
      title: 'Events',
      events
    });
  } catch (err) {
    next(err);
  }
});

// Contact page – display contact form
router.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contact' });
});

// Contact form POST
router.post('/contact', submit);

// Thank You page – show confirmation
router.get('/thankyou', (req, res) => {
  const { name } = req.query;
  res.render('pages/thankyou', {
    title: 'Thank You',
    name
  });
});

module.exports = router;
