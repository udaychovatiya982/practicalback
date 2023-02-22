const mongoose = require("mongoose");
const url = "mongodb+srv://Parth:parth842001@filestorage.yhntynt.mongodb.net/?retryWrites=true&w=majority";
var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);

mongoose.set("strictQuery", false);
mongoose.connect(url).then(() => {
    console.log("Connection Success");

}).catch((err) => console.log("not connected :" + err));

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(function (file) {
    mongoose.model(path.parse(file).name, require(path.join(__dirname, file))(mongoose));
});

module.exports = mongoose;