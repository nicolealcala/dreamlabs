import Image from "next/image";
import ContactImg from "../../../public/contact.png";
import ContactForm from "@/components/contact/ContactForm";

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
              src={ContactImg}
              alt="About Image"
              fill
              placeholder="blur"
              sizes="100vw"
              className="img-contain"
            />
          </a>
        </div>
      </div>
      <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start py-5">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
