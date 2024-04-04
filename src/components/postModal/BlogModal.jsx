"use client";
import { useState } from "react";
import { addBlog } from "@/lib/actions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Tiptap from "../tiptap/Tiptap";
import styles from "./modal.module.css";

const BlogModal = ({ modalOpen, setModalOpen, userId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await addBlog(formData);
      Swal.fire({
        title: "Success",
        html: "<em>Blog has been posted!</em>",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      handleClose();
      router.push("/blogs");
    } catch (err) {
      console.error(err);
    }
  };

  const confirmClose = (e) => {
    e.preventDefault();
    if (title || content) {
      Swal.fire({
        title: "Are you sure?",
        html: "<em>Your changes won't be saved.</em>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Discard Changes",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleClose();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.close();
        }
      });
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setContent("");
    setTitle("");
    setImg("");
    setModalOpen(false);
  };
  return (
    <>
      {modalOpen && (
        <>
          <div className={styles.backdrop}></div>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <form onSubmit={handleSubmit} data-bs-theme="dark">
                <div className={styles.header}>
                  <span className="fs-5">Hello World</span>
                  <label onClick={confirmClose} className="btn text-light">
                    ✕
                  </label>
                </div>
                <hr className="my-0" />
                <div className={styles.body}>
                  <div className="row mx-0 gy-3">
                    <div className="col-12 col-lg-6">
                      <label htmlFor="title" className="required">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control border-secondary bg-transparent"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="col-12 col-lg-6">
                      <label htmlFor="img">Picture</label>
                      <input
                        type="text"
                        name="img"
                        className="form-control border-secondary bg-transparent"
                        onChange={(e) => setImg(e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="content" className="required">
                        Content
                      </label>
                      <Tiptap
                        content={content}
                        onChange={(c) => setContent(c)}
                      />
                      <input type="hidden" name="content" value={content} />
                      <input type="hidden" name="userId" value={userId} />
                    </div>
                  </div>
                </div>
                <hr className="my-0" />
                <div className={`${styles.footer} d-flex justify-content-end`}>
                  <button
                    className="btn btn-secondary me-3"
                    onClick={confirmClose}
                  >
                    Discard
                  </button>
                  <button
                    className="btn primary-btn"
                    disabled={!(title && content)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BlogModal;
