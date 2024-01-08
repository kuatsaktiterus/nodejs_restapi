import {Router} from 'express';
import auth from '../controller/Auth.controller.js';
import PostController from '../controller/Post.controller.js';
import UserController from '../controller/User.controller.js';
import AuthMiddleware from '../middleware/auth.middleware.js';
import uploadAvatar from '../services/uploadAvatar.service.js';

const router = Router();

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
router.post('/signup/', auth.signUp);

router.post('/login/', auth.login);

export {router};