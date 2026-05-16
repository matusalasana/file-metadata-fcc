const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Import multer
require('dotenv').config();

const app = express();

// Set up multer (storing files in memory is sufficient for this project)
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the index page
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**
 * THE SOLUTION ROUTE
 * 1. 'upload.single('upfile')' is the middleware. 
 * 2. 'upfile' must match the 'name' attribute in the HTML form.
 */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.json({ error: "No file uploaded" });
  }

  // Return the required JSON format
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});