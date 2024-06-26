"use server"
import { revalidatePath } from "next/cache";
import { User, Blog, Comment } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt"

export const addBlog = async (formData) => {
    const { title, content, img, userId } = Object.fromEntries(formData);
    const slug = typeof title === "string" ? title.replace(/[<>,!?:/&'\\-]/g, "").split(" ").join("-").toLowerCase() : "";

    try {
        connectToDb()
        const newBlog = new Blog({
            title,
            content,
            img: img || "/blog.png",
            userId,
            slug
        })
        const savedBlog = await newBlog.save();
        revalidatePath("/blogs");
        const plainBlog = {
            ...savedBlog.toJSON(),
            _id: savedBlog._id.toJSON()
        };
        return plainBlog;
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

export const updateBlog = async (id, formData) => {
    const { title, content, img } = Object.fromEntries(formData);
    const slug = typeof title === "string" ? title.replace(/[<>,!?:/&'\\-]/g, "").split(" ").join("-").toLowerCase() : "";

    try {
        connectToDb()
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, img, slug }, { new: true });
        revalidatePath("/blogs");
        revalidatePath(`/blogs/${slug}`);
        const plainBlog = {
            ...updatedBlog.toJSON(),
            _id: updatedBlog._id.toJSON()
        }
        return plainBlog;
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

export const deleteBlog = async (blogId) => {
    try {
        connectToDb()
        await Comment.deleteMany({ blogId })
        await Blog.findByIdAndDelete({ _id: blogId });
        revalidatePath("/blogs/[slug]");
        return;
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

export const addComment = async (formData) => {
    const { content, userId, blogId } = Object.fromEntries(formData);
    console.log(content, userId, blogId)
    try {
        connectToDb();
        const newComment = new Comment({ content, userId, blogId })
        const savedComment = await newComment.save();
        revalidatePath("/blogs/[slug]");
        const plainComment = {
            ...savedComment.toJSON(),
            _id: savedComment._id.toJSON()
        }
        return plainComment;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

export const updateComment = async (id, blogId, formData) => {
    const { content } = Object.fromEntries(formData);
    try {
        connectToDb()
        const blog = await Blog.findById(blogId);
        const comment = await Comment.findByIdAndUpdate(id, { content });
        revalidatePath(`/blogs/${blog.slug}`);
        const plainComment = {
            ...comment.toJSON(),
            _id: comment._id.toJSON()
        }
        revalidatePath("/blogs/[slug]")
        return plainComment;
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

export const deleteComment = async (id) => {
    try {
        connectToDb();
        await Comment.findByIdAndDelete({ _id: id })
        revalidatePath("/blogs/[slug]");
        return { success: true }
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

export const deleteUser = async (id) => {
    try {
        connectToDb()
        await Comment.deleteMany({ userId: id })
        await Blog.deleteMany({ userId: id })
        await User.findByIdAndDelete(id);
        //TODO: Kill session of deleted user.
        revalidatePath("/admin");
        revalidatePath("/blogs");
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

export const updateRole = async (id, role) => {
    try {
        connectToDb();
        await User.findByIdAndUpdate(id, { isAdmin: role })
        revalidatePath("/admin")
        return;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

export const githubLogin = async () => {
    await signIn("github");
};

export const logout = async () => {
    await signOut();
}

export const register = async (prev, formData) => {
    const { username, email, password, cpassword } = Object.fromEntries(formData);

    if (password !== cpassword) {
        console.log('Passwords did not match');
        return { pwError: "Passwords did not match. Try again." }
    }

    try {
        connectToDb();
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return { unError: "Username already exists" }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save();
        return { success: true }
    } catch (err) {
        return { error: "Failed to register account. Try again." }
    }
}

export const login = async (prevState, formData) => {
    const { email, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { email, password });
    } catch (err) {
        if (err.type === "CredentialsSignin") {
            return { error: "Invalid username or password" };
        }
        throw err;
    }
};

