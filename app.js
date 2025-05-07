// Entry point for VibeLink

const express = require("express");
const path = require("path");
const pageRoutes = require("./routes/pageRoutes");

const app = express();
const port = process.env.PORT || 3000;

// --------------- In-memory data stores ---------------
// Team information
const teamMembers = [
  { name: "Jeremia Fourie", role: "Backend Developer" },
  { name: "Waldo Blom", role: "Frontend Developer" },
  { name: "Itumeleng Monokoane", role: "Documentation Manager" },
  { name: "Onalerona Lefoka", role: "Data Manager"}
];

// Upcoming events
const events = [
  {
    title: "Art Workshop",
    date: "2025-05-15",
    location: "Community Center",
    image: "art.jpg"
  },
  {
    title: "Tech Talk",
    date: "2025-06-01",
    location: "Town Hall",
    image: "tech.jpg"
  },
  {
    title: "Music Festival",
    date: "2025-07-20",
    location: "Central Park",
    image: "music.jpg"
  }
];

// Contact form submissions
const submissions = [];

// --------------- App Configuration ---------------

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Make data available in routes via app.locals
app.locals.team = teamMembers;
app.locals.events = events;
app.locals.submissions = submissions;

// Use modular routes
app.use('/', pageRoutes);

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start server
app.listen(port, () => {
  console.log(`VibeLink is running on http://localhost:${port}`);
});
