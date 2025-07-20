

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const urlRouter = require('./routes/url');
const { connectToDatabase } = require('./connect');
const URL = require('./models/url');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



connectToDatabase('mongodb://localhost:27017/URLmod')
  .then(() => {
    console.log('Connected to MongoDB');

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    app.use("/urls", urlRouter);

    // Home Page - Display All URLs
    app.get('/', async (req, res) => {
      try {
        const allUrls = await URL.find({});
        res.render('home', { urls: allUrls });
      } catch (err) {
        console.error('Error loading home page:', err);
        res.status(500).send('Internal Server Error');
      }
    });

    // POST handler for shortening a URL
    app.post('/', async (req, res) => {
      const enteredURL = req.body.url;

      if (!enteredURL) {
        return res.status(400).send('URL is required');
      }

      const shortId = Math.random().toString(36).substring(2, 8);

      await URL.create({
        shortId,
        redirectURL: enteredURL,
        visitHistory: [],
      });

      return res.redirect('/');
    });

    // Redirect + Track visit
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

        return res.redirect(entry.redirectURL);
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
