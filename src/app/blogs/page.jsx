import PostCard from "@/components/postCard/PostCard";
import ToggleModal from "@/components/postModal/toggleModal";
import { auth } from "@/lib/auth";
import { getBlogs } from "@/lib/data";

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
        {session?.user.isAdmin ? (
          <>
            {" "}
            <p>Come back later or create a new post.</p>
            <ToggleModal
              userId={session?.user.id}
              btnName="+ Create Blog"
              btnId=""
            />
            {/* <Modal userId={JSON.parse(JSON.stringify(user._id))} /> */}
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
    <div className="row mx-0 gx-5 py-5">
      {session?.user.isAdmin && (
        <ToggleModal userId={session?.user.id} btnName="+" btnId="addBtn" />
      )}

      {blogs.map((blog) => (
        <div className="col-md-6 col-lg-4 mb-4" key={blog.id}>
          <PostCard item={blog} />
        </div>
      ))}
    </div>
  );
};

export default Blogs;
