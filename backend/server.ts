import express from "express"
import app from "./app"
import "dotenv/config"
import path from "path"
import { ensureUploadDir } from "./src/helper/pathUploadExists"
import fs from "fs"

const port = process.env.PORT

const uploadDir = path.join(__dirname, 'uploads')
const defaultImageSource = path.join(__dirname, 'uploads', 'default-avatar.svg')

console.log('uploadDir:', uploadDir)
console.log('defaultImageSource:', defaultImageSource)
console.log('Arquivo existe?', fs.existsSync(defaultImageSource))

ensureUploadDir(uploadDir, defaultImageSource)

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})