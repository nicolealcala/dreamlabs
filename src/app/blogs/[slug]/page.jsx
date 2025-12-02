import Image from "next/image";
import styles from "../blog.module.css";
import Author from "@/components/postAuthor/Author";
import { Suspense } from "react";
import { getBlog, getComments, getUserByEmail } from "@/lib/data";
import NotFound from "@/app/not-found";
import { createMarkup, getBase64 } from "@/lib/utils";
import { auth } from "@/lib/auth";
import CommentForm from "@/components/comments/CommentForm";
import CommentBox from "@/components/comments/CommentBox";
import DeleteBtn from "@/components/blogControls/DeleteBtn";
import EditBtn from "@/components/blogControls/EditBtn";
import BackToTop from "@/components/backToTop/BackToTop";
import CommentsSkeleton from "@/components/comments/Skeleton";
import AuthorSkeleton from "@/components/postAuthor/Skeleton";

//Next.js only fetch data once even if its called by multiple functions (generateMetaData)
export const dynamicMetadata = async ({ params }) => {
  const { slug } = params;
  const blog = await getBlog(slug);

  return {
    title: blog.title,
    desc: blog.content,
  };
};

const BlogPost = async ({ params }) => {
  const { slug } = params;
  const session = await auth();

  // FETCH DATA WITHOUT API
  const blog = await getBlog(slug);

  if (!blog) return <NotFound />;

  const comments = await getComments(blog._id);

  return (
    <div className={`row mx-0 pb-5 ${styles.body}`}>
      <div className="postBody p-3">
        <div className="col-12 d-flex p-0">
          <div className={styles.postImg}>
            <Image
              src={blog?.img}
              alt="Post Image"
              fill
              className="img-cover"
            />
          </div>
        </div>
        <div className={`row mx-0 pt-3 ${styles.content}`}>
          <div className="col-12 p-0">
            <h2>
              <strong>{blog?.title}</strong>
            </h2>
          </div>
          <div className="col-md-6 p-0 mb-3">
            <Suspense fallback={<AuthorSkeleton />}>
              <Author blog={blog} />
            </Suspense>
          </div>
          {session.user.id === blog.userId && (
            <div className="col-md-6 d-flex justify-content-start justify-content-md-end align-items-end p-0 mb-3">
              <EditBtn blog={blog} />
              <DeleteBtn blogId={blog?._id} />
            </div>
          )}
          <hr />
          <div
            className={`col-12 mt-4 p-0`}
            dangerouslySetInnerHTML={createMarkup(blog?.content)}
          ></div>
        </div>

        <hr className="mt-4 mb-0" />
        <div className={`w-100 rounded-4 mt-4 ${styles.commentSection}`}>
          {comments.length === 0 && (
            <div className="col-12 mt-3">This post has no comments yet.</div>
          )}
          <div className="col-12 mt-3">
            <CommentForm user={session.user} blogId={blog._id} />
          </div>
          <hr className="my-4" />
          {comments.length > 0 && (
            <>
              <div className="col-12 txt-weight-normal mt-3 mb-4">
                {comments.length > 0 && "Comments"}
              </div>
              {comments.map((comment) => (
                <div key={comment._id}>
                  <Suspense fallback={<CommentsSkeleton />}>
                    <CommentBox
                      user={session.user}
                      comment={comment}
                      poster={blog.userId}
                      key={comment._id}
                    />
                  </Suspense>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default BlogPost;
