const jwt = require('jsonwebtoken');

// Replace with env variable or config in production
const SECRET = 'your_secret_key_here'; 

function setUser(user) {
  // Create JWT token by signing user payload
  return jwt.sign(user, SECRET);
}

function getUser(token) {
  try {
    // Verify and decode token
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};














// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

// module.exports = {
//   setUser,
//   getUser,
// };
