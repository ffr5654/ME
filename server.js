const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'public', 'uploads'); // Save videos in the 'public/uploads' directory
        fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the directory exists
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('video');

app.post('/upload-video-endpoint', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        return res.status(200).send('Video uploaded successfully');
    });
});

app.use(express.static('public')); // Serve static files from the 'public' directory

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
