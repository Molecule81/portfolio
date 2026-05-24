require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const contactRoutes = require('./contact.route');

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/contact', contactRoutes);

// Fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
