const multer = require('multer')


const FILE_TYPE_MAP = {
   "image/png": "png",
   "image/jpg": "jpg",
   "image/jpeg": "jpeg"
}

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './uploads')
   },
   filename: (req, file, cb) => {
      const filename = file.originalname.replace(' ', '-')
      const extension = FILE_TYPE_MAP[file.mimetype]
      cb(null, `${filename}-${Date.now()}.${extension}`)
   }
})

const upload = multer({ storage })

module.exports = upload