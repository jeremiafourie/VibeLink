require('dotenv').config();
const express       = require('express');
const mongoose      = require('mongoose');
const session       = require('express-session');
const path          = require('path');

// your existing routers/controllers
const pageRoutes    = require('./routes/pageRoutes');
const authRoutes    = require('./routes/authRoutes');
const adminRoutes   = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ————————————————————————————————————————————————————————————————
// 1) Connect to MongoDB
// ————————————————————————————————————————————————————————————————
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ————————————————————————————————————————————————————————————————
// 2) Session middleware (for admin login, OTP flows, etc.)
// ————————————————————————————————————————————————————————————————
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// ————————————————————————————————————————————————————————————————
// 3) Express setup
// ————————————————————————————————————————————————————————————————
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// ————————————————————————————————————————————————————————————————
// 4) Routes
// ————————————————————————————————————————————————————————————————
app.use('/', pageRoutes);      // single-page front end
app.use('/auth', authRoutes);  // OTP/login flows
app.use('/admin', adminRoutes);// admin CRUD
app.use('/', contactRoutes);   // contact form POST

// 404 & error handlers
app.use((req, res) => res.status(404).send('Page Not Found'));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

// ————————————————————————————————————————————————————————————————
// 5) Start server
// ————————————————————————————————————————————————————————————————
app.listen(PORT, () =>
  console.log(`🚀 VibeLink running at http://localhost:${PORT}`)
);
