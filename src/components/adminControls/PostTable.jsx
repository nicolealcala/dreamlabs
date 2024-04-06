"use client";
import { deleteBlog } from "@/lib/actions";
import Image from "next/image";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

const UserTable = ({ blogs }) => {
  const handleDelete = async (blog) => {
    Swal.fire({
      title: "Are you sure?",
      html: `<em><strong>${blog.title}</strong> will be deleted permanently.</em>`,
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBlog(blog._id);
          Swal.fire({
            title: "Success!",
            text: `${blog.title} has been deleted.`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting user.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <Table responsive data-bs-theme="dark" striped>
      <thead>
        <tr>
          <th colSpan={4} className="text-center">
            Blog Posts
          </th>
        </tr>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog, index) => {
          return (
            <tr key={index + 1}>
              <th scope="row">{index + 1}</th>
              <td className="flex-wrap" title={blog.title}>
                {blog.title.substr(0, 40) + "..."}
              </td>
              <td>hello</td>
              <td>
                <div className="d-flex">
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(blog)}
                    className="me-2"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UserTable;
