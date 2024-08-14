const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const HttpError = require('../models/error.model');
const JWT = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const HttpsError = require('../models/error.model');
require("dotenv").config();

// Register user
// POST request : api/users/register
// Unprotected
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password) {
            return next(new HttpError("Fill in all the fields.", 422));
        }

        const newEmail = email.toLowerCase();
        const emailExists = await User.findOne({ email: newEmail });

        if (emailExists) {
            return next(new HttpError("This email is already registered.", 422));
        }

        if (password.trim().length < 8) {
            return next(new HttpError("Password should be at least 8 characters.", 422));
        } else if (password !== password2) {
            return next(new HttpError("Passwords do not match", 422));
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email: newEmail,
            password: hashedPassword
        });

        res.status(201).json(`New user ${newEmail} registered.`);
    } catch (error) {
        return next(new HttpError("User registration failed.", 500));
    }
};

// Login user
// POST request : api/users/login
// Unprotected
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new HttpError("Fill in all the details.", 422));
        }

        const newEmail = email.toLowerCase();
        const userExists = await User.findOne({ email: newEmail });

        if (!userExists) {
            return next(new HttpError("Email does not exist.", 422));
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
        if (!isPasswordCorrect) {
            return next(new HttpError("Password does not match.", 422));
        }

        const { _id: id, name } = userExists;
        const token = JWT.sign(
            { id, name },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            token,
            id,
            name,
            message: `${newEmail} logged in successfully.`
        });
    } catch (error) {
        return next(new HttpError("Login failed. Please check your credentials.", 500));
    }
};

// Get user profile
// GET request : api/users/:id
// Protected
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        
        if (!user) {
            return next(new HttpError("User not found.", 404));
        }

        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError("Fetching user failed.", 500));
    }
};

// Change user avatar
// PUT request : api/users/change-avatar
// Protected
const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files || !req.files.avatar) {
            return next(new HttpError("Please choose an image.", 422));
        }

        const { avatar } = req.files;

        if (avatar.size > 500000) {
            return next(new HttpError("File size too big. It should be less than 500KB.", 422));
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new HttpError("User not found.", 404));
        }

        if (user.avatar) {
            const oldAvatarPath = path.join(__dirname, '..', 'uploads', user.avatar);
            fs.unlink(oldAvatarPath, (err) => {
                if (err) {
                    return next(new HttpError("Failed to delete old avatar.", 500));
                }
            });
        }

        const splittedFilename = avatar.name.split('.');
        const newFilename = `${splittedFilename[0]}_${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;

        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError("Failed to upload new avatar.", 500));
            }

            user.avatar = newFilename;
            const updatedAvatar = await user.save();

            if (!updatedAvatar) {
                return next(new HttpError("Avatar could not be updated.", 422));
            }

            res.status(200).json(
                updatedAvatar,
               );
        });
    } catch (error) {
        return next(new HttpError("Changing avatar failed.", 500));
    }
};

// Edit user details
// PATCH request : api/users/edit-user
// Protected
const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, newConfirmPassword } = req.body;

        // Check for missing fields
        if (!name || !email || !currentPassword || !newPassword || !newConfirmPassword) {
            return next(new HttpError("Fill in all the fields", 422));
        }

        // Get user from the database
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        // Make sure email is unique
        const newEmail = email.toLowerCase();
        const emailExists = await User.findOne({ email: newEmail });

        if (emailExists && emailExists._id.toString() !== req.user.id) {
            return next(new HttpError("Email already exists", 422));
        }

        // Compare current password with the database password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return next(new HttpError("Invalid current password.", 422));
        }

        // Compare new password and confirm password
        if (newPassword !== newConfirmPassword) {
            return next(new HttpError("Passwords do not match", 422));
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user details
        user.name = name;
        user.email = newEmail;
        user.password = hashedPassword;

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        next(new HttpError("Editing user details failed.", 500));
    }
};

// Get authors/users
// GET request : api/users/authors
// Unprotected
const getAuthors = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        return next(new HttpError("Fetching authors failed.", 500));
    }
};

// Exporting all the functions
module.exports = {
    registerUser,
    loginUser,
    getUser,
    changeAvatar,
    editUser,
    getAuthors
};
