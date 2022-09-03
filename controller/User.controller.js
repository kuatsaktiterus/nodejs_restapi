const User = require('../models/User.model');
const fs = require('fs').promises;

module.exports = {
    get: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.json({message: error});
        }
    },

    post: async (req, res) => {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        });

        try {
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.json({message: error});
        }     
    },

    uploadAvatar: async (req, res) => {
        try {
            const updatedUser = 
            await User.findByIdAndUpdate(
            {_id: req.userId}, { 
                $set: {
                avatar: req.filename
                }
            });

            await fs.unlink(`public/img/${updatedUser.avatar}`);

            res.json(updatedUser);
        } catch (error) {
            res.json(error);
        }  
    },

    getById: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    },

    update: async (req, res) => {
        try {
            const updatedUser = 
            await User.updateOne(
            {_id: req.params.userId}, { 
                $set: {
                username: req.body.username,
                password: req.body.password,
                role: req.body.role,
                }
            }); 
            res.json(updatedUser);
        } catch (error) {
            res.json(error);
        }
    },

    destroy: async (req, res) => {
        try {
            const removedUser = await User.findByIdAndDelete({_id: req.params.userId});

            await fs.unlink(`public/img/${removedUser.avatar}`);

            res.json(removedUser);
        } catch (error) {
            res.send({message: error});
        }
    },
};