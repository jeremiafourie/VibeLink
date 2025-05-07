// routes/contactRoutes.js
const router = require('express').Router();
const { submit } = require('../controllers/contactController');
router.post('/contact', submit);
module.exports = router;
