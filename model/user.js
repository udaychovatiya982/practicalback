module.exports = function (mongoose) {
    const userSchema = new mongoose.Schema({
        email: {
            type: String
        },
        password: {
            type: String
        }

    });
    return userSchema;
};