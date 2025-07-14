const express = require('express');
const {handleGenerateShortUrl} = require('../controllers/url');
const router = express.Router();

router.post('/',handleGenerateShortUrl);

// router.get('/:shortId', handleRedirectShortUrl); // handles GET /:shortId


module.exports = router;