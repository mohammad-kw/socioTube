import multer from "multer";

// multer simply ese work krta h ke
// cloudinary per upload hone se phele hum use apne local storage (public folder/temp) ke andr store krenge to frr uske bad wo cloudinary per store hoga
// multer ko hum ek temporary storage bol skte h


// cb is callback

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
    
})

export const upload = multer({
    storage
})