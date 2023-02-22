module.exports = function (mongoose) {
    const fileSchema = new mongoose.Schema({
        name: {
            type: String
        },
        description: {
            type: String
        },
        imagePath: {
            type: String
        },
        audioPath: {
            type: String
        }

    });
    return fileSchema;
};