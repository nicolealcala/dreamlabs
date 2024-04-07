import Image from "next/image";

export const metadata = {
  title: "Contact",
  description: "Next.js starter app",
};
const Contact = () => {
  return (
    <div className="row mx-0">
      <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
        <div className="img-container">
          <a href="https://storyset.com/business" target="_blank">
            <Image
              src="/contact.png"
              alt="About Image"
              fill
              sizes="100vw"
              className="img-contain"
            />
          </a>
        </div>
      </div>
      <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start py-5">
        <form action="" className="contactForm" data-bs-theme="dark">
          <div className="row mx-0">
            <h3 className="mb-4 d-lg-none txt-color-mid txt-weight-mid">
              Contact Us
            </h3>
            <div className="col-md-6 mb-2">
              <label htmlFor="fName">First Name</label>
              <input
                type="text"
                className="form-control border border-secondary text-light"
                name="fName"
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                className="form-control border border-secondary text-light"
                name="lName"
                required
              />
            </div>
            <div className="col-12 mb-2">
              <label htmlFor="contact">Phone Number (optional)</label>
              <input
                type="tel"
                minLength={11}
                className="form-control border border-secondary text-light"
                placeholder="09XXXXXXXXX"
                name="contact"
              />
            </div>
            <div className="col-12 mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                maxLength={50}
                className="form-control border border-secondary text-light"
                placeholder="example@example.com"
                name="email"
                required
              />
            </div>
            <div className="col-12 mb-2">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control border border-secondary text-light"
                name="message"
                rows="8"
                required
              ></textarea>
            </div>
            <div className="col-12 my-2">
              <button type="submit" className="btn primary-btn">
                Send message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
