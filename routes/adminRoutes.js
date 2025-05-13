const router = require('express').Router();
const Event  = require('../models/Event');
const Submission = require('../models/Submission');

// — all admin routes require an admin session —
router.use((req, res, next) => {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }
  next();
});

// Organizations page – list all organizations
router.get('/users', async (req, res, next) => {
  try {
    const users = await user.find();
    res.render('pages/users', {
      title: 'Users',
      users
    });
  } catch (err) {
    next(err);
  }
});

// Submissions page – list all submissions
router.get('/submissions', async (req, res, next) => {
  try {
    const submissions = await Submission.find();
    res.render('pages/submissions', {
      title: 'Submissions',
      submissions
    });
  } catch (err) {
    next(err);
  }
});

// CREATE
router.post('/events', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// UPDATE
router.put('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) throw new Error('Not found');
    res.json({ success: true, event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE
router.delete('/events/:id', async (req, res) => {
  try {
    const ev = await Event.findByIdAndDelete(req.params.id);
    if (!ev) throw new Error('Not found');
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
