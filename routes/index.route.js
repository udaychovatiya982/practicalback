const express = require('express');
const router = express.Router();
var fs = require("fs")

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(200).send({ status: "Error", message: "Email And Password Requrid" });
        }
        const user = await db.models.user.findOne({ email })
        if (user) {

            if (user.password == password) {
                return res.status(200).send("Login Successfull")
            } else {
                return res.status(200).send("Invalid Password")
            }
        } else {
            return res.status(200).send("User not Found or Exists")
        }
    } catch (err) {
        throw err
    }
})

router.post('/uploadFile', upload.array("files"), async (req, res) => {
    try {
        const { files } = req
        const { name, description } = req.body
        if (files) {
            let audioFile = files.find(f => f.mimetype.includes('audio/'))
            let imageFile = files.find(f => f.mimetype.includes('image/'))
            const file = await db.models.file.create({
                name: name ? name : null,
                description: description ? description : null,
                imagePath: imageFile ? imageFile.path : null,
                audioPath: audioFile ? audioFile.path : null
            })
            return res.status(200).send("File Uploaded")
        }
        else {
            return res.status(404).send("fileNot Found")
        }
    }
    catch (error) {
        return res.send(error)
    }
})

router.delete('/deleteFile', async (req, res) => {
    try {
        const { fileId } = req.body
        let fileData = await db.models.file.findOne({ _id: fileId })
        if (fileData) {
            let result = await db.models.file.findByIdAndDelete({ _id: fileId })
            let imagePath = fileData.imagePath.split("'\'")
            let audioPath = fileData.audioPath.split("'\'")
            console.log(imagePath[imagePath.length - 1], audioPath[audioPath.length - 1]);
            await fs.unlink("../storage/" + imagePath[imagePath.length - 1])
            await fs.unlink("../storage/" + audioPath[audioPath.length - 1])
            if (result)
                return res.status(200).send("File Deleted")
            else
                return res.status(200).send("Not Deleted")
        }
        else {
            return res.status(404).send("File Not Found")
        }
    }
    catch (error) {
        console.log(error);
        return res.send(error)
    }
})

router.get('/getAllFiles', async (req, res) => {
    try {
        const fileList = await db.models.file.find()
        if (fileList)
            return res.status(200).send(fileList)
        else
            return res.status(200).send("Not Found")
    }
    catch (error) {
        return res.send(error)
    }
})
router.post('/getAllFiles', async (req, res) => {
    try {
        const fileList = await db.models.file.find()
        if (fileList)
            return res.status(200).send(fileList)
        else
            return res.status(200).send("Not Found")
    }
    catch (error) {
        return res.send(error)
    }
})

module.exports = router