const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  
  const file = req.file;
  const { date, time } = req.body;

  // Here you can handle the uploaded file and the appointment data
  // For now, let's just send a success response
  res.send(`File uploaded: ${file.originalname} on ${date} at ${time}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
