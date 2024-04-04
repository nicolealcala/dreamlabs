"use client";
import { addComment } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";

const CommentForm = ({ session, blogId }) => {
  const [content, setContent] = useState("");
  const handleAddComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await addComment(formData);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleAddComment}
      className="d-flex commentForm"
      data-bs-theme="dark"
    >
      <Image
        src={session.user.img || session.user.image}
        width={35}
        height={35}
        alt="Commentor Image"
        className="rounded-pill me-2"
      />
      <div className="flex-grow-1">
        <textarea
          name="content"
          cols="30"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control border-secondary"
          placeholder="Write a comment..."
          required
        ></textarea>
        <input type="hidden" name="userId" value={session?.user.id} />
        <input type="hidden" name="blogId" value={blogId} />
        <button type="submit" className="btn primary-btn mt-2">
          Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
