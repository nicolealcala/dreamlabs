"use client";
import { useState } from "react";
import styles from "./comment.module.css";
import EditModal from "./EditCommentModal";
const EditBtn = ({ comment }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-transparent border-0 txt-size-sm me-2"
        id={styles.edit}
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
