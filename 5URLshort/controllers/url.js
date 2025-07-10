const { nanoid } = require('shortid');

async function handleGenerateShortUrl(req, res) {
  //npm i nanoid

  const shortID = shortid(7); // Generate a unique short ID
  const body = req.body;
  if(!body.url) return res.status(400).json({ error: 'URL is required' });   
  await URL.create({
    shortId: shortID,
    redirectURL: req.body.redirectURL,
    visitHistory: []
  });
}