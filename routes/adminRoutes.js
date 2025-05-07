const router = require('express').Router();
const Event = require('../models/Event');

// Protect all admin routes
router.use((req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
});

// List events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.render('admin/dashboard', { events });
});

// Create event
router.post('/events', async (req, res) => {
  await Event.create(req.body);
  res.redirect('/admin');
});

// ... edit/delete routes

module.exports = router;
