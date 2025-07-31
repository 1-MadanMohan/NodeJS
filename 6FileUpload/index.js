const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 8000;

// Setup multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   return cb(null,"./uploads"); // ✅ Correct path
  },
  filename: function (req, file, cb) {
    
    return cb(null, `${Date.now()}-${file.originalname }`);
  }
});

const upload = multer({storage: storage });

// Middleware
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.set("views",path.resolve("./views"))
// Serve uploads folder as static
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.render('homepage');
});

app.post('/upload', upload.single('profileimage'), (req, res) => {
//   if (!req.file) return res.send('No file uploaded.');
//   res.send(`File uploaded successfully! Stored as: ${req.file.filename}`);

console.log(req.body);
console.log(req.file);
return res.redirect('/');   
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
