"use client";
import { deleteBlog } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const DeleteBtn = ({ blogId }) => {
  const router = useRouter();
  const confirmDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      html: "<em>Your blog post will be deleted forever.</em>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
        });

        try {
          await deleteBlog(blogId);
          Toast.fire({
            icon: "success",
            title: "Blog deleted",
          });
          router.push("/blogs");
        } catch (err) {
          console.log(err);
          Toast.fire({
            icon: "error",
            title: "Failed to delete blog",
          });
        }
      }
    });
  };
  return (
    <button className="btn btn-danger" onClick={confirmDelete}>
      Delete
    </button>
  );
};

export default DeleteBtn;
