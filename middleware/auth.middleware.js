const jwt = require("jsonwebtoken");
const User = require('../models/User.model');
require('dotenv/config');


module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.headers["x-access-token"];

        if (!token)
            return res.status(403).send({ message: "No token provided!" });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
        } catch (error) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        next();
    },

    isAdmin: async (req, res, next) => {
        const user = await User.findById(req.userId);

        if (user.role === "admin" || user.role === "super admin") return next();

        res.status(403).send({message: "Unauthorized!"});
    },

    isSuperAdmin: async (req, res, next) => {
        const user = await User.findById(req.userId);

        if (user.role === "super admin") return next();

        res.status(403).send({message: "Unauthorized!"});
    }
}