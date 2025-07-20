const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const urlRouter = require('./routes/url');
const userRoute = require('./routes/user');
const { connectToDatabase } = require('./connect');
const { restrictToLoggedinUserOnly, checkAuth } = require('./middlewares/auth');
const URL = require('./models/url');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect DB
connectToDatabase('mongodb://localhost:27017/URLmod')
  .then(() => {
    console.log('Connected to MongoDB');

    // Routes
    app.use("/user", userRoute); // login/signup
    app.use("/urls", restrictToLoggedinUserOnly, urlRouter); // URL logic

    app.get('/', checkAuth, async (req, res) => {
      try {
        const allUrls = await URL.find({});
        res.render('home', { urls: allUrls });
      } catch (err) {
        console.error('Error loading home page:', err);
        res.status(500).send('Internal Server Error');
      }
    });

    app.post('/', restrictToLoggedinUserOnly, async (req, res) => {
      const enteredURL = req.body.url;
      if (!enteredURL) return res.status(400).send('URL is required');

      const shortId = Math.random().toString(36).substring(2, 8);

      await URL.create({
        shortId,
        redirectURL: enteredURL,
        visitHistory: [],
      });

      return res.redirect('/');
    });

    app.get('/:shortId', async (req, res) => {
      try {
        const entry = await URL.findOneAndUpdate(
          { shortId: req.params.shortId },
          { $push: { visitHistory: { timestamp: new Date() } } }
        );

        if (!entry) return res.status(404).send('Short URL not found');
        res.redirect(entry.redirectURL);
      } catch (err) {
        console.error('Redirect error:', err);
        res.status(500).send('Internal Server Error');
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });



// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = 3000;

// const urlRouter = require('./routes/url');
// const { connectToDatabase } = require('./connect');
// const URL = require('./models/url');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// connectToDatabase('mongodb://localhost:27017/URLmod')
//   .then(() => {
//     console.log('Connected to MongoDB');

//     app.set('view engine', 'ejs');
//     app.set('views', path.join(__dirname, 'views'));

//     app.use("/urls", urlRouter);

//     // Home Page - Display All URLs
//     app.get('/', async (req, res) => {
//       try {
//         const allUrls = await URL.find({});
//         res.render('home', { urls: allUrls });
//       } catch (err) {
//         console.error('Error loading home page:', err);
//         res.status(500).send('Internal Server Error');
//       }
//     });

//     // POST handler for shortening a URL
//     app.post('/', async (req, res) => {
//       const enteredURL = req.body.url;

//       if (!enteredURL) {
//         return res.status(400).send('URL is required');
//       }

//       const shortId = Math.random().toString(36).substring(2, 8);

//       await URL.create({
//         shortId,
//         redirectURL: enteredURL,
//         visitHistory: [],
//       });

//       return res.redirect('/');
//     });

//     // Redirect + Track visit
//     app.get('/:shortId', async (req, res) => {
//       const shortId = req.params.shortId;

//       try {
//         const entry = await URL.findOneAndUpdate(
//           { shortId },
//           { $push: { visitHistory: { timestamp: new Date() } } }
//         );

//         if (!entry) {
//           return res.status(404).json({ error: 'Short URL not found' });
//         }

//         return res.redirect(entry.redirectURL);
//       } catch (err) {
//         console.error('Redirect error:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//     });

//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Database connection failed:', err);
//   });




















// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = 3000;
// const urlRouter = require('./routes/url');
// const { connectToDatabase } = require('./connect');
// const staticRouter = require('./routes/staticRouter'); // ✅ Import static router
// const URL = require('./models/url'); // ✅ Import the model

// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // ✅ Middleware to parse URL-encoded bodies

// connectToDatabase('mongodb://localhost:27017/URLmod')
//   .then(() => {
//     console.log('Connected to MongoDB');

//     app.set('view engine', 'ejs'); // ✅ Set EJS as the view engine
//     // app.set('views', path.resolve("./views")); // ✅ Set the views directory
// app.set('views', path.join(__dirname, 'views'));

//     app.use("/urls", urlRouter);
//     app.use("/static", staticRouter); // ✅ Use the static router


//     // app.get("/test", async (req, res) => {
//     //   const allUrls = await URL.find({});
//     //   // return res.render('home.ejs'); 
//     //   return res.render('home', { urls: allUrls });

//     // })
      
    


//     // app.get('/test',(req,res)=>{
//     //   return res.end('<h1>Hey from Server</h1>')
//     // })//Server side rendering 
//     // //There are tools like ejs, pug to solve this server side rendering problem

//     // app.get('/test', async (req, res) => {
//     //     const allUrls = await URL.find({});
//     //     return res.end(
//     //       ` <html>
//     //       <body>
//     //       <h1>Hey from Server</h1>
//     //       <ul>
//     //         ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length} </li>`).join('')}
//     //       </ul>
//     //       </body>
//     //       </html>`
//     //     );
//     //   }
//     // ); // ✅ Server-side rendering example

//     // ✅ Redirect + visit tracking route
//     app.get('/:shortId', async (req, res) => {
//       const shortId = req.params.shortId;

//       try {
//         const entry = await URL.findOneAndUpdate(
//           { shortId },
//           { $push: { visitHistory: { timestamp: new Date() } } }
//         );

//         if (!entry) {
//           return res.status(404).json({ error: 'Short URL not found' });
//         }

//         return res.redirect(entry.redirectURL); // ✅ redirect
//       } catch (err) {
//         console.error('Redirect error:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//     });

//     app.post('/', async (req, res) => {
//   const body = req.body;
//   const enteredURL = body.url;

//   if (!enteredURL) {
//     return res.status(400).send('URL is required');
//   }

//   const shortId = Math.random().toString(36).substring(2, 8); // simple short ID

//   await URL.create({
//     shortId,
//     redirectURL: enteredURL,
//     visitHistory: [],
//   });

//   return res.send(`Short URL created: <a href="/${shortId}">/${shortId}</a>`);
// });


//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Database connection failed:', err);
//   });
