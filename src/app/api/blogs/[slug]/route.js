import { Blog } from "@/lib/models"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { slug } = params
    try {
        connectToDb()
        const blogs = Blog.findOne({ slug });
        return NextResponse.json(blogs);
    } catch (err) {
        throw new Error('Failed tof fetch posts.')
    }
}

export const DELETE = async (req, { params }) => {
    const { slug } = params
    try {
        connectToDb()
        const blogs = Blog.deleteOne({ slug });
        return NextResponse.json(blogs);
    } catch (err) {
        throw new Error('Failed tof fetch posts.')
    }
}