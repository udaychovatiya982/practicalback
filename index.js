const express = require("express")
const app = express()
global.router = express.Router()
global.bodyparser = require("body-parser");
var multer = require("multer")
var cors = require("cors")
global.db = require('./model');

app.use(cors());
app.use(cors({ origin: '*'}))

app.use(express.json());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

global.upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"
            || file.mimetype == "audio/mpeg" || file.mimetype == "audio/mp3") {
            cb(null, file.originalname)
        } else {
            cb(null, false);
            return cb(new Error('Only png, jpg, jpeg and mpeg format allowed!'));
        }
    }
});

const indexRoute = require("./routes/index.route")
app.use('/api', indexRoute)


const port = 8080
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});