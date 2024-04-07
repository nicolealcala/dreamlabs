"use client";
import { deleteUser, updateRole } from "@/lib/actions";
import Image from "next/image";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

const UserTable = ({ users, session }) => {
  const changeRole = async (user) => {
    const message = user.isAdmin
      ? `<em>Remove admin rights for <strong>${user.username}</strong>?</em>`
      : `<em>Make <strong>${user.username}</strong> an admin?</em>`;

    Swal.fire({
      title: "Are you sure?",
      html: message,
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateRole(user._id, !user.isAdmin);
          Swal.fire({
            title: "Success!",
            text: `Role for ${user.username} has been updated.`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while changing the role.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleDelete = async (user) => {
    Swal.fire({
      title: "Are you sure?",
      html: `<em><strong>${user.username}</strong> will be deleted permanently.</em>`,
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(user._id);
          Swal.fire({
            title: "Success!",
            text: `${user.username} has been deleted.`,
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
            Users
          </th>
        </tr>
        <tr>
          <th scope="col">#</th>
          <th scope="col">User</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={index + 1}>
              <th scope="row">{index + 1}</th>
              <td>
                <div className="d-flex">
                  <Image
                    src={user?.img}
                    alt="User Image"
                    width={25}
                    height={25}
                    className="rounded-pill"
                  />
                  <span className="ms-2">{user?.username}</span>
                </div>
              </td>
              <td>{user?.isAdmin ? "Admin" : "User"}</td>
              <td>
                <div className="d-flex">
                  <Button
                    variant="danger"
                    disabled={session.user.id === user._id}
                    onClick={() => handleDelete(user)}
                    className="me-2"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="none"
                    className="bg-violet"
                    disabled={session.user.id === user._id}
                    onClick={() => changeRole(user)}
                  >
                    Change
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
