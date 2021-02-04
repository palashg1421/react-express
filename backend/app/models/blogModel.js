/**
 * The User model
 */
const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: false
    },
}, {timestamps: true});

module.exports = mongoose.model('blogModel', BlogSchema, 'blog');