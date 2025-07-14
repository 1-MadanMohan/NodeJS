const express = require('express');
const app = express();
const PORT = 3000;
const urlRouter = require('./routes/url');
const { connectToDatabase } = require('./connect');
const URL = require('./models/url'); // ✅ Import the model

app.use(express.json());

connectToDatabase('mongodb://localhost:27017/URLmod')
  .then(() => {
    console.log('Connected to MongoDB');

    app.use("/urls", urlRouter);

    // ✅ Redirect + visit tracking route
    app.get('/:shortId', async (req, res) => {
      const shortId = req.params.shortId;

      try {
        const entry = await URL.findOneAndUpdate(
          { shortId },
          { $push: { visitHistory: { timestamp: new Date() } } }
        );

        if (!entry) {
          return res.status(404).json({ error: 'Short URL not found' });
        }

        return res.redirect(entry.redirectURL); // ✅ redirect
      } catch (err) {
        console.error('Redirect error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
