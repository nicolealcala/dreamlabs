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
        try {
          await deleteBlog(blogId);
          Swal.fire({
            title: "Success",
            html: "<em>You blog was deleted!</em>",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/blogs");
        } catch (err) {
          console.log(err);
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
