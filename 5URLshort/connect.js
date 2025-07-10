const mongoose = require('mongoose');

async function connectToDatabase(uri) {
  return mongoose.connect(uri); // use the correct parameter name
}

module.exports = { connectToDatabase };
