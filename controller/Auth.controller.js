const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    signUp: async (req, res) => {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        });

        try {
            const savedUser = await user.save();
            res.status(201).send({message: "registered", user: savedUser});
        } catch (error) {
            res.status(500).send({message: error});
        }     
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});

            if (user.validatePassword(req.body.password)) {
                const token = jwt.sign(
                {
                    id: user._id
                }, JWT_SECRET);

                return res.json({status: "login", data: token});;
            }

            res.json({status: error, message: "Invalid username/password"});
        } catch (error) {
            res.json({message: error});
        }
    }
}