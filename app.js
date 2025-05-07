// Entry point for VibeLink

const express = require("express");
const path = require("path");
const pageRoutes = require("./routes/pageRoutes");

const app = express();
const port = process.env.PORT || 3000;

// --------------- In-memory data stores ---------------
// Team information
const teamMembers = [
  { name: "Alice Johnson", role: "Coordinator" },
  { name: "Bob Smith", role: "Event Manager" },
  { name: "Carol Lee", role: "Marketing Lead" }
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

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", pageRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
