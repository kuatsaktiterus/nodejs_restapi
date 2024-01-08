import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
    
const Post = mongoose.model('Post', PostSchema);

export default Post;