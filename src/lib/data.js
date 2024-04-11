import { connectToDb } from "./utils";
import { Blog, User, Comment } from "./models";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";

export const getBlogs = async () => {
    noStore();
    try {
        connectToDb();
        const blogs = await Blog.find({});
        const plainBlogs = blogs.map(blog => {
            const plainBlog = {
                ...blog.toJSON(),
                _id: blog._id.toJSON()
            }
            return plainBlog;
        });
        return plainBlogs;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

export const getBlog = async (slug) => {
    noStore();
    try {
        connectToDb();
        const blog = await Blog.findOne({ slug });
        const plainBlog = {
            ...blog.toJSON(),
            _id: blog._id.toJSON()
        }
        return plainBlog;
    } catch (err) {
        console.log(err);
        return notFound;
    }
}

export const getUserByEmail = async (userEmail) => {
    noStore();
    try {
        connectToDb();
        const user = await User.findOne({ email: userEmail });
        const plainUser = {
            ...user.toJSON(),
            _id: user._id.toJSON()
        }
        return plainUser;
    } catch (err) {
        console.log(err); throw new Error("Fetching user failed.");
    }
}

export const getUser = async (userId) => {
    noStore();
    try {
        connectToDb();
        const user = await User.findById(userId);
        const plainUser = {
            ...user.toJSON(),
            _id: user._id.toJSON()
        }
        return plainUser;
    } catch (err) {
        console.log(err); throw new Error("Fetching user failed.");
    }
}

export const getUsers = async () => {
    noStore();
    try {
        connectToDb();
        const users = await User.find();
        const plainUsers = users.map(user => {
            const plainUser = {
                ...user.toJSON(),
                _id: user._id.toJSON()
            }
            return plainUser;
        })
        return plainUsers;
    } catch (err) {
        console.log(err); throw new Error("Fetching post failed.");
    }
}

export const getComments = async (blogId) => {
    noStore();
    try {
        connectToDb();
        const comments = await Comment.find({ blogId });
        const plainComments = comments.map(comment => {
            const plainComment = {
                ...comment.toJSON(),
                _id: comment._id.toJSON()
            }

            return plainComment;
        })
        return plainComments;
    } catch (err) {
        console.log(err); throw new Error("Fetching comments failed.");
    }
}