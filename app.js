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
