"use client";
import { useState } from "react";
import styles from "./modal.module.css";
import ModalBlog from "./Modal";
const AddBtn = ({ btnId, btnName, userId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn bg-light border-0 py-2"
        id={btnId ? styles[btnId] : ""}
        onClick={() => setShowModal(true)}
      >
        <span className="txt-weight-mid">{btnName}</span>
      </button>
      <ModalBlog
        showModal={showModal}
        setShowModal={setShowModal}
        userId={userId}
      />
    </>
  );
};

export default AddBtn;
