const mongoose = require('mongoose');
const { Schema , model } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            "Agriculture",
            "Business",
            "Education",
            "Entertainment",
            "Art",
            "Investment",
            "Uncategorized",
            "Weather"
        ],
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thumbnail:{
        type:String,
        require:true
    },
 
},{timestamps:true});



const Post = model('Post', postSchema);

module.exports = Post;


