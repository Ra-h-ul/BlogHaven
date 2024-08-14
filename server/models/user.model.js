const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String // Optional field, so `required` is not set
    },
    posts: {
        type: Number,
        default: 0 // Default value is 0
    }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
