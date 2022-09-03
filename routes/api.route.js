const express = require('express');
const AuthController = require('../controller/Auth.controller');
const router = express.Router();
const PostController = require('../controller/Post.controller');
const UserController = require('../controller/User.controller');
const AuthMiddleware = require('../middleware/auth.middleware');
const uploadAvatar = require('../services/uploadAvatar.service');

/**
 * 
 * Post Route
 */
router.get('/posts/', PostController.get);

router.post('/posts/', PostController.post);

router.get('/posts/:postId', PostController.getById);

router.get('/posts/user/:userId', PostController.getPostByUser);

router.delete('/posts/:postId', PostController.destroy);

router.patch('/posts/:postId', PostController.update);


/**
 * 
 * User Route
 */
router.use("/user/", AuthMiddleware.verifyToken);

router.get('/user/', UserController.get);

router.post('/user/', UserController.post);

router.post('/user/avatar', uploadAvatar.single('avatar'), UserController.uploadAvatar);

router.get('/user/:userId', UserController.getById);    

router.delete('/user/:userId', AuthMiddleware.isAdmin, UserController.destroy);

router.patch('/user/:userId', UserController.update);


/**
 * 
 * Auth Route
 */
router.post('/signup/', AuthController.signUp);

router.post('/login/', AuthController.login);

module.exports = router;