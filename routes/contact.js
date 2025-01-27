const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST route to handle contact form submissions
router.post('https://wizard-engineers.up.railway.app/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Configure the email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', //service you prefer
            auth: {
                user: process.env.EMAIL, // Your email
                pass: process.env.PASSWORD, // App-specific password or your email password
            },
        });

        // Email options
        const mailOptions = {
            from: email,
            to: process.env.EMAIL, // Your email address to receive the message
            subject: `Portfolio Contact Form:`,
            text: `You have a new message from ${name} (${email}):\n\n${message}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
    console.log('Contact form submitted:', req.body);
});
module.exports = router;
