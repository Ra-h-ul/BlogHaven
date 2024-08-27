const HttpError = require('../models/error.model');
const User = require('../models/user.model')
const Post = require('../models/post.model');
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { log } = require('console');

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
        const posts = await Post.find().sort({
            updatedAt: -1
        })
        res.status(201).json(posts)
    } catch (error) {
        next(new HttpError("Fetching posts failed.", 500));
    }
};

// Get Single Post
// GET request : /api/posts/:id
// protected
const getPost = async (req, res, next) => {
    try {

        const posts = await Post.findById(req.params.id)
        if (!posts) return next(new HttpError(" post not found.", 500));
        res.status(201).json(posts)

    } catch (error) {
        next(new HttpError("Fetching post failed.", 500));
    }
};

// Get Posts by Category
// GET request : /api/posts/category/:category
// Unprotected
const getCategoryPost = async (req, res, next) => {
    try {
        const { category } = req.params;

        const posts = await Post.find({ category }).sort({ createdAt: -1 });

        if (!posts || posts.length === 0) {
            return next(new HttpError("No posts found in this category.", 404));
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(new HttpError("Fetching posts by category failed.", 500));
    }
};


// Get Posts by User
// GET request : /api/posts/user/:userId
// Unprotected
const getUserPost = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const posts = await Post.find({ creator: userId }).sort({ createdAt: -1 });

        if (!posts || posts.length === 0) {
            return next(new HttpError("No posts found by this user", 404));
        }

        res.status(200).json(posts);
    } catch (error) {
        next(new HttpError("Fetching user's posts failed.", 500));
    }
};


// Edit Post
// PATCH request : /api/posts/:id
// Protected
const editPost = async (req, res, next) => {
    try {
        let updatedPost;
        let newFilename;

        const { title, category, description } = req.body;
        const { postId } = req.params;

        // Fetch the existing post
        const oldPost = await Post.findById(postId);
        if (!oldPost) {
            return next(new HttpError("Post not found", 404));
        }

        // Construct the fields to be updated
        const updatedFields = {};
        if (title) updatedFields.title = title;
        if (category) updatedFields.category = category;
        if (description) updatedFields.description = description;

        // Handle thumbnail update
        if (req.files && req.files.thumbnail) {
            const thumbnail = req.files.thumbnail;

            if (thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail too big. Should be less than 2MB", 422));
            }

            // Generate new filename
            const fileName = thumbnail.name;
           
            const splittedFilename = fileName.split('.');
            newFilename = `${splittedFilename[0]}-${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;

            // Define the upload path
            const uploadPath = path.join(__dirname, '..', 'uploads', newFilename);

            // Move the new thumbnail file
            await thumbnail.mv(uploadPath);

            // Remove old thumbnail if it exists
            if (oldPost.thumbnail) {
                const oldThumbnailPath = path.join(__dirname, '..', 'uploads', oldPost.thumbnail);
                fs.unlink(oldThumbnailPath, (err) => {
                    if (err) {
                        console.error('Failed to remove old thumbnail:', err);
                    }
                });
            }

            // Update the thumbnail field in the database
            updatedFields.thumbnail = newFilename;
        }

        // Update the post with the provided fields
        updatedPost = await Post.findByIdAndUpdate(postId, updatedFields, { new: true });

        if (!updatedPost) {
            return next(new HttpError('Failed to update the post', 400));
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        next(new HttpError("Editing post failed.", 500));
    }
};



// Delete Post
// DELETE request : /api/posts/:id
// Protected
const deletePost = async (req, res, next) => {
    try {
        const postCreator = req.user.id;
        const postId = req.params.id;

        
        // Find the post by ID
        const deletePost = await Post.findById(postId);

        if (!deletePost) {
            return next(new HttpError("Post not found.", 404));
        }
       
        // Check if the logged-in user is the creator of the post
        if (deletePost.creator.toString() !== postCreator) {
            return next(new HttpError("You are not authorized to delete this post.", 403));
        }
       

        const thumbnailPath = path.join(__dirname, '..', 'uploads', deletePost.thumbnail)
        fs.unlink(thumbnailPath, (err) => {
            if (err) {
                console.error("Failed to delete thumbnail:", err);
            } else {
                console.log("Thumbnail deleted successfully.");
            }
        });


        // Delete post from db
        await Post.findByIdAndDelete(postId);  

        const currentUser = await User.findById(req.user.id);
        const userPostCount = currentUser?.posts-1;
        await User.findByIdAndUpdate(req.user.id , {posts:userPostCount})      

        res.status(200).json({ message: "Post deleted successfully." });
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
