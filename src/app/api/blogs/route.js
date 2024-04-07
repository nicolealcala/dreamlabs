// import { Blog } from "@/lib/models"
// import { connectToDb } from "@/lib/utils"
// import { NextResponse } from "next/server";

// export const GET = async (req) => {
//     try {
//         connectToDb()
//         const blogs = Blog.find();
//         return NextResponse.json(blogs);
//     } catch (err) {
//         throw new Error('Failed to fetch posts.')
//     }
// }