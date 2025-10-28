import multer from "multer"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const filename = `${uuidv4()}${path.extname(file.originalname)}`
        cb(null, filename)
    }
})

export const upload = multer({ storage })
