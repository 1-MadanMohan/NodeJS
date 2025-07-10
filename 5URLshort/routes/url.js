const express = require('express');
const {handleGenerateShortUrl} = require('../controllers/url');
const urlRouter = require('./routes/url');
const router = express.Router();
const URL = require('../models/url');

router.post