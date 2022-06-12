const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;