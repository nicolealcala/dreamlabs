"use client";
import { useState } from "react";
import styles from "./modal.module.css";
import CreateModal from "./CreateModal";
const AddBtn = ({ btnId, btnName, userId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn border-0 py-2"
        id={btnId ? styles[btnId] : ""}
        onClick={() => setShowModal(true)}
      >
        <span className="txt-weight-mid">{btnName}</span>
      </button>
      <CreateModal
        showModal={showModal}
        setShowModal={setShowModal}
        userId={userId}
      />
    </>
  );
};

export default AddBtn;
