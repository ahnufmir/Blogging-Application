const multer = require('multer');

function createUploader(folderName){
    const storage = multer.diskStorage({
        destination : function(req,file,cb){
            cb(null, `./Public/uploads/${folderName}`)
        },
        filename : function(req,file,cb){
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    });
    return multer({storage});
}
module.exports = {
    createUploader
}