const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files from current directory

// In-memory storage (replace with database in production)
let appointments = [];
let messages = [];

// API Endpoints
app.post('/api/appointments', (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            service,
            date,
            time,
            message
        } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !service || !date || !time) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        // Create appointment object
        const appointment = {
            id: Date.now(),
            name,
            email,
            phone,
            service,
            date,
            time,
            message,
            createdAt: new Date()
        };

        // Store appointment
        appointments.push(appointment);

        // Send success response
        res.status(201).json({
            message: 'Appointment booked successfully',
            appointment
        });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

app.post('/api/messages', (req, res) => {
    try {
        const {
            name,
            email,
            subject,
            message
        } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        // Create message object
        const messageObj = {
            id: Date.now(),
            name,
            email,
            subject,
            message,
            createdAt: new Date()
        };

        // Store message
        messages.push(messageObj);

        // Send success response
        res.status(201).json({
            message: 'Message sent successfully',
            messageObj
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the application`);
});
