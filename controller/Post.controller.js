import Post from '../models/Post.model.js';
import User from '../models/User.model.js';

const PostController = {
    get: async (req, res) => {
        try {
            const posts = await Post.find();
            res.json(posts);
        } catch (error) {
            res.json({message: error});
        }
    },

    post: async (req, res) => {
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            user: req.body.userId
        });
    
        try {
            savedPost = await post.save();

            const userById = await User.findById(req.body.userId);

            userById.posts.push(post);
            await userById.save();

            return res.status(201).send(savedPost);
        } catch (error) {
            res.json({message: error});
        }     
    },

    getById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.postId);
            res.json(post);
        } catch (error) {
            res.json(error);
        }
    },

    getPostByUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId).populate("posts", "-user");
            res.send(user.posts);
        } catch (error) {
            res.send({message: error});
        }
    },

    destroy: async (req, res) => {
        try { 
            const { postId } = req.params;
            const post = await Post.findByIdAndDelete({_id: postId}, {new: true});

            await User.findOneAndUpdate(
                { posts: postId}, 
                { $pull: { posts: postId } }
            );

            res.json(post);
        } catch (error) {   
            res.json({message: error});
        }
    },

    update: async (req, res) => {
        try {
            const updatedPost = 
            await Post.updateOne(
            {_id: req.params.postId}, { 
                $set: {
                title: req.body.title,
                description: req.body.description,
                }
            }); 
            res.json(updatedPost);
        } catch (error) {
            res.json(error);
        }
    }
}

export default PostController;