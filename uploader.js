const multerS3 = require("multer-s3-v2");
const multer = require("multer");
const path = require("path");
const aws = require("aws-sdk");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.aws_accessKeyID,
  secretAccessKey: process.env.aws_secretAccessKey,
  Bucket: process.env.aws_bucketName,
});

const singleFileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.aws_bucketName,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE, // very important

    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 5242880 }, // In bytes: 5000000 bytes = 5 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

module.exports = {
  singleFileUpload,
};
