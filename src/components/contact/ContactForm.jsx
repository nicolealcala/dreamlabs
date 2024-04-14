"use client";

import { useState } from "react";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const sendMail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
    });

    if (response.ok) {
      Toast.fire({
        icon: "success",
        title: "Email sent!",
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Failed to send email!",
      });
    }
    setIsSending(false);
  };
  return (
    <form onSubmit={sendMail} className="contactForm" data-bs-theme="dark">
      <div className="row mx-0">
        <h3 className="mb-4 d-lg-none txt-color-mid txt-weight-mid">
          Contact Us
        </h3>
        <div className="col-12 mb-2">
          <label htmlFor="lName">Full name</label>
          <input
            type="text"
            className="form-control border border-secondary text-light"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-2">
          <label htmlFor="contact">Phone number (optional)</label>
          <input
            type="tel"
            minLength={11}
            className="form-control border border-secondary text-light"
            placeholder="09XXXXXXXXX"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-2">
          <label htmlFor="contact">Email address</label>
          <input
            type="email"
            maxLength={50}
            className="form-control border border-secondary text-light"
            placeholder="example@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 mb-2">
          <label htmlFor="email">Subject</label>
          <input
            type="text"
            className="form-control border border-secondary text-light"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 mb-2">
          <label htmlFor="message">Message</label>
          <textarea
            className="form-control border border-secondary text-light"
            name="message"
            rows="8"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="col-12 my-2">
          <button
            type="submit"
            className="btn primary-btn"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Sending
              </>
            ) : (
              "Send message"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
