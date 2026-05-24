require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const contactRoute = require('./contact.route');

const app = express();

app.use(cors({
  origin: 'https://Molecule81.github.io'
}));
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/contact', contactRoute);

// Fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
