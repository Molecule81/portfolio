const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const path = require('path')
const contactRoutes = require('./routes/contact');


// Load environment variables
dotenv.config();

// Middleware to parse JSON
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount contact route
app.use('/api/contact', contactRoutes);


// Serve static files (e.g., contact.html)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'), (err) => {
        if (err) {
            console.error('Error loading contact.html:', err);
            res.status(500).send('Server error');
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
