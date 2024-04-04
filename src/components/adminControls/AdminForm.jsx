"use client";
import { addBlog } from "@/lib/actions";
import React, { useState } from "react";
import Tiptap from "../tiptap/Tiptap";

const AdminForm = () => {
  const [content, setContent] = useState("");
  return (
    <form action={addBlog} data-bs-theme="dark" className="createForm py-3">
      <div className="row mx-0">
        <div className="col-12 col-md-6">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control bg-transparent border-secondary"
            name="title"
          />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="title">Picture</label>
          <input
            type="text"
            className="form-control bg-transparent border-secondary"
            name="img"
          />
        </div>

        <div className="col-12">
          <label htmlFor="title">Content</label>
          <Tiptap content={content} onChange={(c) => setContent(c)} />
          <input type="hidden" className="form-control" name="content" />
        </div>
      </div>
    </form>
  );
};

export default AdminForm;
