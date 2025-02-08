const multer = require("multer");
const path = require("path");
const BaseError = require("../errors/base_error");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {recursive:true});
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileNewName = `${Date.now()}${fileExtension}`;
    cb(null, fileNewName);
  },
});

const upload = multer({ storage });

class ImageUpload {
  singleImage(req, res, next) {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return next(BaseError.BadRequestError(err.message))
      }
      if (!req.file) {
        return next(BaseError.BadRequestError("You should upload only 1 image"));
      }
      req.fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;

      next();
    });
  }

  multipleImages(req, res, next) {
    upload.array("pictures", 3)(req, res, (err) => {
      if (err) {
        return next(BaseError.BadRequestError(err.message));
      }
      if (!req.files || req.files.length !== 3) {
        return next(BaseError.BadRequestError(
          "The number of images must be exatly 3!"
        ));
      }
      req.fileUrls = req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
      next();
    });
  }

  multipleTypes(req, res, next) {
    upload.fields([
      { name: "external_photo", maxCount: 1 },
      { name: "inner_photo", maxCount: 1 },
      { name: "model_photo", maxCount: 1 },
    ])(req, res, (err) => {
      if (err) {
        return next(BaseError.BadRequestError(err.message));
      }
      if (
        !req.files ||
        !req.files["external_photo"] ||
        !req.files["inner_photo"] ||
        !req.files["model_photo"]
      ) {
        return next(BaseError.BadRequestError(
          "Please, check your request carefully"
        ));
      }
      req.fileUrl1 = `${req.protocol}://${req.get("host")}/uploads/${
        req.files["external_photo"][0].filename
      }`;
      req.fileUrl2 = `${req.protocol}://${req.get("host")}/uploads/${
        req.files["inner_photo"][0].filename
      }`;
      req.fileUrl3 = `${req.protocol}://${req.get("host")}/uploads/${
        req.files["model_photo"][0].filename
      }`;

      next();
    });
  }
}

module.exports = new ImageUpload();
