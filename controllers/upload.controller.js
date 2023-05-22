const multer = require('multer');
const fs = require('fs');
const {v4: uuidv4} = require('uuid')

const storage = multer.diskStorage({
        destination: (req,file,callback) => {
            callback(null, 'public/upload/product')
        },
        filename: (req,file,callback) => {
            const fileExt = file.originalname.split('.').at(-1)
            const fileName = `${uuidv4()}.${fileExt}`
            req.body.image = fileName
            callback(null, fileName)
        }
})

const uploadMulter = multer({
    storage,
    limits: {fileSize: 1024 * 1024 * 10 },
    fileFilter: (req,file,callback) =>{
        file.mimetype.split('/')[0] === 'image' ? callback(null,true) : callback(null,false)

    }
})

const uploadProduct = uploadMulter.single('image')

module.exports = {
    uploadProduct
}