const { REQUEST_URI_TOO_LONG } = require("http-status-codes");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileNewName = `${Date.now()}${fileExtension}`;
    cb(null, fileNewName);
  },
});

const upload = multer({ storage });

const fileUploader = (req, res, next) => {
  upload.array("pictures", 3)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }
    if (!req.files || req.files.length !== 3) {
      return res.status(400).json({ msg: "You must upload exactly 3 images" });
    }

    req.fileUrls = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    next();
  });
};

const singleFile = (req, res, next) => {
upload.single('picture')(req, res, (err) => {
  if(err){
    return res.status(400).json({msg: err.message})
  }
  
  if(!req.file){
    return res.status(400).json({ msg: "You can upload only 1 image" });
  }
  req.fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  next()
})
}

module.exports = {fileUploader, singleFile};


