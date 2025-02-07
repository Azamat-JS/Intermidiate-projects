const multer = require("multer");
const path = require("path");
const BaseError = require('../errors/base_error')

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

class ImageUpload {
    singleImage(req, res, next){
 upload.single('picture')(req, res, (err) => {
  if(err){
    throw BaseError.BadRequestError(err.message)
  }
  if(!req.file){
    throw BaseError.BadRequestError('You should upload only 1 image')
  }
  req.fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

  next()
 })
    }

    multipleImages(req, res, next){
        upload.array('pictures', 3)(req, res, (err) => {
            if(err){
                throw BaseError.BadRequestError(err.message)
            }
            if(!req.files || req.files.length !== 3){
                throw BaseError.BadRequestError('The number of images must be exatly 3!')
            }
            req.fileUrls = req.files.map(
                (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
            )
            next()
        })
    }
}

module.exports = ImageUpload()