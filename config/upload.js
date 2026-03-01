const multer = require('multer');

function createUploader(){
  const storage = multer.memoryStorage(); // memory instead of disk
  return multer({ storage });
}
module.exports = {
    createUploader
}