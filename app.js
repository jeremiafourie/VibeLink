require('dotenv').config();
const express       = require('express');
const mongoose      = require('mongoose');
const session       = require('express-session');
const path          = require('path');

// your existing routers/controllers
const pageRoutes    = require('./routes/pageRoutes');
const authRoutes    = require('./routes/authRoutes');
const adminRoutes   = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// --------------- In-memory data stores ---------------
// Team information
const teamMembers = [
  { name: "Jeremia Fourie", role: "Backend Developer"},
  { name: "Waldo Blom", role: "Frontend Developer" },
  { name: "Itumeleng Monokoane", role: "Documentation Manager" },
  { name: "Onalerona Lefoka", role: "Data Manager" }
];

// Upcoming events
const events = [
  {
    title: "Community Picnic",
    date: "2025-06-15",
    location: "Riverside Park",
    description: "Bring your favorite dish and enjoy a fun-filled afternoon with neighbors and friends.",
    eventCategory: "Community",
    image: "/images/community_picnic.jpg"
  },
  {
    title: "Woodworking Workshop",
    date: "2025-08-10",
    location: "Downtown Community Center",
    description: "Learn the basics of woodworking and create your own small project to take home.",
    eventCategory: "Workshop",
    image: "/images/woodworking_workshop.jpg"
  },
  {
    title: "Family Game Night",
    date: "2025-09-05",
    location: "Maple Grove Library",
    description: "Enjoy board games, puzzles, and friendly competition for all ages.",
    eventCategory: "Family",
    image: "/images/family_game_night.jpg"
  },
  {
    title: "Neighborhood Clean-Up",
    date: "2025-10-12",
    location: "Elm Street",
    description: "Join your neighbors to beautify our streets and parks in this community effort.",
    eventCategory: "Community",
    image: "/images/neighborhood_cleanup.jpg"
  },
  {
    title: "Photography Workshop",
    date: "2025-11-08",
    location: "Art Studio on Main",
    description: "Discover tips and tricks for capturing stunning photos with your camera or phone.",
    eventCategory: "Workshop",
    image: "/images/photography_workshop.jpg"
  },
  {
    title: "Family Storytime",
    date: "2025-07-25",
    location: "City Library",
    description: "Bring your kids for an evening of storytelling and interactive activities.",
    eventCategory: "Family",
    image: "/images/family_storytime.jpg"
  },
  {
    title: "Community Art Fair",
    date: "2025-08-22",
    location: "Town Square",
    description: "Showcase and purchase local artwork while enjoying live music and food stalls.",
    eventCategory: "Community",
    image: "/images/community_art_fair.jpg"
  },
  {
    title: "Cooking Workshop",
    date: "2025-09-18",
    location: "Culinary School",
    description: "Master new recipes and cooking techniques in this hands-on session.",
    eventCategory: "Workshop",
    image: "/images/cooking_workshop.jpg"
  },
  {
    title: "Family Science Day",
    date: "2025-10-25",
    location: "Science Museum",
    description: "Explore interactive exhibits and experiments designed for curious minds of all ages.",
    eventCategory: "Family",
    image: "/images/family_science_day.jpg"
  },
  {
    title: "Community Gardening",
    date: "2025-11-15",
    location: "Greenfield Community Garden",
    description: "Plant, weed, and harvest together to grow fresh produce for the neighborhood.",
    eventCategory: "Community",
    image: "/images/community_gardening.jpg"
  }
];

// Contact form submissions
const submissions = [];

// Make data available in routes via app.locals
app.locals.team = teamMembers;
app.locals.events = events;
app.locals.submissions = submissions;

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
// app.use('/', contactRoutes);   // contact form POST

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
