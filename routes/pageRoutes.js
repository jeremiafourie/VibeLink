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
    title: 'About Us',
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

// Contact form submission
// router.post('/contact', (req, res) => {
//   const { name, email, message } = req.body;
//   if (!name || !email || !message) {
//     return res.status(400).send('All fields are required.');
//   }
//   req.app.locals.submissions.push({ name, email, message });
//   // Redirect to thank you page, passing name as query
//   res.redirect(`/thankyou?name=${encodeURIComponent(name)}`);
// });


router.post('/contact', submit);

// Thank You page – show confirmation
router.get('/thankyou', (req, res) => {
  const { name } = req.query;
  res.render('pages/thankyou', { name,
    title: 'Thank You'
  });
});

module.exports = router;
