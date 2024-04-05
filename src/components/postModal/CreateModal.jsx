import { useState } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { addBlog } from "@/lib/actions";
import Swal from "sweetalert2";
import Tiptap from "../tiptap/Tiptap";

const CreateModal = ({ showModal, setShowModal, userId }) => {
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

  const confirmClose = () => {
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
        <Modal.Title className="fs-5">Create Blog</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="mx-0">
            <Form.Group className="col-6 mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="img">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter picture URL"
                value={img}
                name="img"
                onChange={(e) => setImg(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Tiptap text={content} onChange={(c) => setContent(c)} />
              <Form.Control type="hidden" name="content" value={content} />
              <Form.Control
                type="hidden"
                name="userId"
                value={userId.toString()}
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={confirmClose}>
            Discard
          </Button>
          <Button
            className="primary-btn"
            variant="none"
            type="submit"
            disabled={!(title && content)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateModal;
