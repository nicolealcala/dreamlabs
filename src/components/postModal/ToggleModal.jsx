"use client";
import { useState } from "react";
import BlogModal from "./BlogModal";
import styles from "./modal.module.css";

const ToggleModal = ({ userId, btnName, btnId }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="btn bg-light border-0 py-2"
        id={styles[btnId]}
        onClick={() => setModalOpen(true)}
      >
        <span className="txt-weight-mid">{btnName}</span>
      </button>
      <BlogModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        userId={userId}
      />
    </>
  );
};

export default ToggleModal;
