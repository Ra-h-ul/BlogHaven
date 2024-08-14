const HttpError = require('../models/error.model');
const User = require('../models/user.model')
const Post = require('../models/post.model');
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

// Create Post
// POST request : /api/posts/
// Protected
const createPost = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;
        const { thumbnail } = req.files || {};

        if (!title || !category || !description || !thumbnail) {
            return next(new HttpError("Please fill in all the details", 422));
        }

        if (thumbnail.size > 2000000) { // 2MB in bytes
            return next(new HttpError("Thumbnail too big. Size should be less than 2MB", 422));
        }

        const fileName = thumbnail.name;
        const splittedFilename = fileName.split('.');
        const newFilename = `${splittedFilename[0]}_${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;

        thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError("Error uploading file", 500));
            }

            const newPost = await Post.create({
                title,
                category,
                description,
                thumbnail: newFilename,
                creator: req.user.id
            });

            // Find user and increase their post count
            const currentUser = await User.findById(req.user.id);
            if (currentUser) {
                currentUser.posts += 1;
                await currentUser.save();
            }

            res.status(201).json({ message: "Post created successfully", post: newPost });
        });

    } catch (error) {
        console.log(error);
        next(new HttpError("Creating post failed.", 500));
    }
};
// Get All Posts
// GET request : /api/posts/
// Unprotected
const getPosts = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Fetched all posts" });
    } catch (error) {
        next(new HttpError("Fetching posts failed.", 500));
    }
};

// Get Single Post
// GET request : /api/posts/:id
// Unprotected
const getPost = async (req, res, next) => {
    try {
        res.status(200).json({ message: `Fetched post with ID ${req.params.id}` });
    } catch (error) {
        next(new HttpError("Fetching post failed.", 500));
    }
};

// Get Posts by Category
// GET request : /api/posts/category/:category
// Unprotected
const getCategoryPost = async (req, res, next) => {
    try {
        res.status(200).json({ message: `Fetched posts in category ${req.params.category}` });
    } catch (error) {
        next(new HttpError("Fetching posts by category failed.", 500));
    }
};

// Get Posts by User
// GET request : /api/posts/user/:userId
// Unprotected
const getUserPost = async (req, res, next) => {
    try {
        res.status(200).json({ message: `Fetched posts by user with ID ${req.params.userId}` });
    } catch (error) {
        next(new HttpError("Fetching user's posts failed.", 500));
    }
};

// Edit Post
// PATCH request : /api/posts/:id
// Protected
const editPost = async (req, res, next) => {
    try {
        res.status(200).json({ message: `Post with ID ${req.params.id} updated successfully` });
    } catch (error) {
        next(new HttpError("Editing post failed.", 500));
    }
};

// Delete Post
// DELETE request : /api/posts/:id
// Protected
const deletePost = async (req, res, next) => {
    try {
        res.status(200).json({ message: `Post with ID ${req.params.id} deleted successfully` });
    } catch (error) {
        next(new HttpError("Deleting post failed.", 500));
    }
};

// Export all functions
module.exports = {
    createPost,
    getPosts,
    getPost,
    getCategoryPost,
    getUserPost,
    editPost,
    deletePost
};
