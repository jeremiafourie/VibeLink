// Defines all page routes for VibeLink

const express = require('express');
const router = express.Router();

const { submit } = require('../controllers/contactController');

// Home page – show 2 upcoming events
router.get('/', (req, res) => {
  const upcomingEvents = req.app.locals.events.slice(0, 3); //Load the first three upcoming events
  res.render('pages/home', { 
    title: 'Home',
    upcomingEvents
  });
});

// About page – list team members
router.get('/about', (req, res) => {
  const team = req.app.locals.team;
  res.render('pages/about', { 
    title: 'About',
   });
});

// Events page – list all events
router.get('/events', (req, res) => {
  const events = req.app.locals.events;
  res.render('pages/events', { 
    title: 'Events',
    events });
});

// Contact page – display contact form
router.get('/contact', (req, res) => {
  res.render('pages/contact', {title: 'Contact'});
});

router.post('/contact', submit);

// Thank You page – show confirmation
router.get('/thankyou', (req, res) => {
  const { name } = req.query;
  res.render('pages/thankyou', { name,
    title: 'Thank You'
  });
});

module.exports = router;
