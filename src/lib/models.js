import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String },
    img: { type: String, default: "/noavatar.png" },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true, },
    img: { type: String, default: "/blog.png" },
    userId: { type: String, required: true, },
    slug: { type: String, required: true, unique: true }
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: String, required: true },
    blogId: { type: String, required: true }
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);