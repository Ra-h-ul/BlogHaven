const JWT = require("jsonwebtoken");
const HttpError = require("../models/error.model");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    const Authorization = req.headers.Authorization || req.headers.authorization;

    if (Authorization && Authorization.startsWith("Bearer")) {
        const token = Authorization.split(' ')[1];
        JWT.verify(token, process.env.JWT_SECRET_KEY, (err, info) => {
            if (err) {
                return next(new HttpError("Unauthorized. Invalid token", 403));
            }

            req.user = info;
            next();
        });
    } else {
        return next(new HttpError("Unauthorized. No token", 422));
    }
};

module.exports = authMiddleware