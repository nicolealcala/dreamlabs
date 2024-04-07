"use client";
import { useState } from "react";
import EditModal from "./EditCommentModal";
const EditBtn = ({ comment }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-transparent border-0 txt-size-md me-2 w-100 text-start px-2 text-dark"
        onClick={() => setShowModal((m) => !m)}
      >
        Edit
      </button>
      <EditModal
        showModal={showModal}
        setShowModal={setShowModal}
        comment={comment}
      />
    </>
  );
};

export default EditBtn;
