// Importing express
const express = require('express');
const app = express();

// Home Route - GET Method
app.get('/', (req, res) => {
    res.send('🏠 Welcome to the Home Page!');
});

// About Route - GET Method
app.get('/about', (req, res) => {
    res.send('ℹ️ This is the About Page.');
});

// Contact Route - GET Method
app.get('/contact', (req, res) => {
    res.send('📞 Contact Us at contact@example.com');
});

// Dynamic Route - URL Parameter
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    res.send(`👤 Hello, ${username}! Welcome to your profile.`);
});

// POST Route Example
app.post('/submit', (req, res) => {
    res.send('✅ Form submitted successfully!');
});

// Catch All - 404 Route (Must be at the end)
app.use((req, res) => {
    res.status(404).send('❌ 404 - Page Not Found');
});

// Start the Server
app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
});
