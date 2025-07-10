const express = require('express');
const app = express();
const PORT = 3000;

const { connectToDatabase } = require('./connect');

// Correct URI spelling: "mongodb"
connectToDatabase('mongodb://localhost:27017/URLshort')
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start the server only after DB is connected
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
