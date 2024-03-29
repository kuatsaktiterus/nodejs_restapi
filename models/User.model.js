import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'super admin'],
        default: 'user',
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    avatar: {
        type: String,
        required: false
    }
});

schema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcryptjs.genSalt(SALT_WORK_FACTOR);
        this.password = await bcryptjs.hash(this.password, salt);
    } catch (error) {
        return next(error);
    }
});

schema.pre('updateOne', async function (next) {
    try {
        if (this._update.$set.password) {
            const salt = await bcryptjs.genSalt(SALT_WORK_FACTOR);
            this._update.$set.password = await bcryptjs.hash(this._update.$set.password, salt);
        }
        next();
    } catch (err) {
        return next(err);
    }
});

schema.methods.validatePassword = async function validatePassword(data) {
    return bcryptjs.compare(data, this.password);
};

const User = mongoose.model('User', schema);

export default User;