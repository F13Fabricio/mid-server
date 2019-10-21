const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const limits = { fileSize: 4 * 1024 * 124 };

const dest = path.resolve(__dirname, '..', '..', 'storage');

const destination = (req, file, cb) => cb(null, dest);

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type.'));
  }
}

const filename = (req, file, cb) => {
  crypto.randomBytes(16, (err, hash) => {
    if (err) {
      cb(err);
    }

    const name = `${hash.toString('hex')}- ${file.originalname}`;
    cb(null, name);
  });
}

const s3 = multerS3({
  s3: new aws.S3({
    accessKeyId: '<ACCESS_KEY_ID>',
    secretAccessKey: '<SECRET_ACCESS_KEY>',
    region: '<REGION>'
  }),
  bucket: 'mid-project',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: filename,
})

module.exports = {
  dest,
  limits,
  fileFilter,
  storage: s3,
};

