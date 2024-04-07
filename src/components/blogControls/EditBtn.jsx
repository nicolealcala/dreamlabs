"use client";
import { useState } from "react";
import EditModal from "../blogControls/EditBlogModal";

const EditBtn = ({ blog }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="btn bg-violet me-2"
        onClick={() => setShowModal((m) => !m)}
      >
        Edit
      </button>
      <EditModal
        showModal={showModal}
        setShowModal={setShowModal}
        blog={blog}
      />
    </>
  );
};

export default EditBtn;
