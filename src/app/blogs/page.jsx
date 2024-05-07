import BackToTop from "@/components/backtotop/BackToTop";
import PostCard from "@/components/postCard/PostCard";
import AddBtn from "@/components/postModal/AddBtn";
import { auth } from "@/lib/auth";
import { getBlogs, getUserByEmail } from "@/lib/data";
import { Suspense } from "react";
import Skeleton from "@/components/postCard/Skeleton";

// FETCH DATA WITH AN API
// const getPosts = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/blogs");
//     if (!res.ok) {
//       throw new Error(`Network response failed. Status ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.log("Something went wrong");
//   }
// };

export const metadata = {
  title: "Blogs",
  description: "DreamLabs complete blog posts.",
};

const Blogs = async () => {
  // FETCH DATA WITH AN API
  // const blogs = await getPosts();

  // FETCH DATA WITHOUT AN API
  const blogs = await getBlogs();
  const session = await auth();

  if (blogs.length === 0) {
    return (
      <div>
        <h2>No posts yet.</h2>
        {session.user.isAdmin ? (
          <>
            <p>Come back later or create a new post.</p>
            <AddBtn btnName="+ Create Blog" userId={session.user.id} />
          </>
        ) : (
          <>
            <p>Come back later.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="row mx-0 p-3">
      {session.user.isAdmin && (
        <div className="col-12 text-end px-0 pb-3">
          <AddBtn
            btnId="addBtnLg"
            btnName="+ Add blog"
            userId={session.user.id}
          />
        </div>
      )}

      {blogs.map((blog) => (
        <div className={`col-md-6 col-lg-4 mb-4 blogCol`} key={blog._id}>
          <Suspense fallback={<Skeleton />}>
            <PostCard blog={blog} />
          </Suspense>
        </div>
      ))}

      <BackToTop />
    </div>
  );
};

export default Blogs;
