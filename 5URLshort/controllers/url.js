// const { nanoid } = require('nanoid');
// import { nanoid } from 'nanoid';
//or const { nanoid } = require('nanoid/async/index.cjs'); // for async version
// const { nanoid } = require('nanoid/index.cjs');
const shortid = require('shortid');
const URL = require('../models/url'); // Adjust path as needed

async function handleGenerateShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const shortID = shortid.generate(); // ✅ Fixed

  try {
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.status(201).json({ id: shortID });
  } catch (err) {
    console.error('Error creating short URL:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


// async function handleRedirectShortUrl(req, res) {
//   const shortId = req.params.shortId;

//   try {
//     const entry = await URL.findOne({ shortId });

//     if (!entry) {
//       return res.status(404).json({ error: 'Short URL not found' });
//     }

//     // Optional: track visit
//     entry.visitHistory.push({ timestamp: new Date() });
//     await entry.save();

//     // Redirect to the original URL
//     return res.redirect(entry.redirectURL);
//   } catch (err) {
//     console.error('Redirect error:', err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }


module.exports = {
  handleGenerateShortUrl,
  // handleRedirectShortUrl,
};










// const { nanoid } = require('shortid');

// async function handleGenerateShortUrl(req, res) {
//   //npm i nanoid

//   const shortID = shortid(7); // Generate a unique short ID
//   const body = req.body;
//   if(!body.url) return res.status(400).json({ error: 'URL is required' });   
//   await URL.create({
//     shortId: shortID,
//     redirectURL: req.body.redirectURL,
//     visitHistory: []
//   });
// }