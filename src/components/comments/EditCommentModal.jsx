"use client";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { updateComment } from "@/lib/actions";

import Tiptap from "../tiptap/Tiptap";

const EditModal = ({ showModal, setShowModal, comment }) => {
  const [content, setContent] = useState(comment?.content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await updateComment(comment._id, formData);
      Swal.fire({
        title: "Success",
        html: "<em>Your comment has been updated!</em>",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const confirmClose = () => {
    if (content) {
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
        }
      });
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <Modal
      show={showModal}
      onHide={confirmClose}
      backdrop="static"
      size="lg"
      data-bs-theme="dark"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Edit Comment</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Tiptap
              text={content}
              onChange={(c) => setContent(c)}
              disable={true}
            />
            <Form.Control type="hidden" name="content" value={content} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={confirmClose}>
            Discard
          </Button>
          <Button
            className="primary-btn"
            variant="none"
            type="submit"
            disabled={!content}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditModal;
