const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
		cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const {originalname} = file;
        req.filename = uniqueSuffix + '-' + originalname;
        cb(null, req.filename);
    }
});

const upload = multer({ storage });

module.exports = upload;