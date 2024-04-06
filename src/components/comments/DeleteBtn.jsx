"use client";
import Swal from "sweetalert2";
import styles from "./comment.module.css";
import { deleteComment } from "@/lib/actions";
const DeleteBtn = ({ commentId }) => {
  const confirmDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      html: "<em>This comment will be deleted forever.</em>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteComment(commentId);
          Swal.fire({
            title: "Success",
            html: "<em>You comment was deleted!</em>",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <button
      className="bg-transparent border-0 txt-size-small"
      id={styles.delete}
      onClick={confirmDelete}
    >
      Delete
    </button>
  );
};

export default DeleteBtn;