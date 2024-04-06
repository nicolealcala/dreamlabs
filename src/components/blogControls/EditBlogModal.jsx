"use client";
import { useState } from "react";
import { Row, Modal, Button, Form } from "react-bootstrap";
import Tiptap from "../tiptap/Tiptap";
import Swal from "sweetalert2";
import { updateBlog } from "@/lib/actions";
import { useRouter } from "next/navigation";

const EditBlogModal = ({ showModal, setShowModal, blog }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [img, setImg] = useState(blog.img);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const newBlog = await updateBlog(blog._id, formData);
      Swal.fire({
        title: "Success",
        html: "<em>Your blog post was updated.</em>",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      handleClose();
      router.push(`/blogs/${newBlog.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmClose = () => {
    if ((title, content)) {
      Swal.fire({
        title: "Are you sure?",
        html: "<em>Your changes will not be saved.</em>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Discard changes",
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
    setTitle(blog.title);
    setContent(blog.content);
    setImg(blog.img);
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

export default EditBlogModal;
