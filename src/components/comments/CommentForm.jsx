"use client";
import { addComment } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

const CommentForm = ({ user, blogId }) => {
  const [content, setContent] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    setIsCommenting(true);
    const formData = new FormData(e.target);

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
    });

    try {
      await addComment(formData);
      setContent("");
      setIsCommenting(false);
      Toast.fire({
        icon: "success",
        title: "Comment added",
      });
    } catch (err) {
      console.error(err);
      Toast.fire({
        icon: "error",
        title: "Failed to add comment",
      });
    }
  };

  return (
    <form
      onSubmit={handleAddComment}
      className="d-flex commentForm"
      data-bs-theme="dark"
    >
      <Image
        src={user.img || user.image}
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
        <input type="hidden" name="userId" value={user.id} />
        <input type="hidden" name="blogId" value={blogId} />
        <button
          type="submit"
          className="btn primary-btn mt-2"
          disabled={isCommenting}
        >
          {isCommenting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Commenting
            </>
          ) : (
            "Comment"
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
