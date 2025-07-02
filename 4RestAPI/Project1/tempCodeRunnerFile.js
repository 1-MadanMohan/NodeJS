const express = require('express');
const app = express();
const users = require('./MOCK_DATA.json');
const port = 3000;

//Routes
app.get('/api/users', (req, res) => {
  return res.json(users);
});  

app.get('/users', (req, res) => {
  const html = `
    <h1>User Details</h1>   
    <ul>
    <!-- ${users.map(user => `<li>${user.Movie}</li>`)}-->
    ${users.map(user => `<li>${user.Movie}</li>`).join('')}
    </ul>
`
res.send(html);});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});