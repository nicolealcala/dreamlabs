import Image from "next/image";
import AboutImg from "../../../public/about.png";
import BannerImg from "../../../public/hackathon-banner.png";
export const metadata = {
  title: "About",
  description: "DreamLabs about page",
};
const About = () => {
  return (
    <div className="row mx-0">
      <Image
        src={BannerImg}
        alt="Banner Image"
        // sizes="100vw"
        placeholder="blur"
        className="img-contain"
      />
      <div className="col-lg-6 d-flex flex-column justify-content-evenly py-5 gap-4">
        <div className="row mx-0">
          <div className="col-12">
            <h4 className="txt-color-mid txt-weight-mid">About Agency</h4>
          </div>
          <div className="col-12">
            <h1 className="my-3">
              <strong>
                We create digital ideas that are bigger, braver, bolder, and
                better.
              </strong>
            </h1>
          </div>
          <div className="col-12">
            <p className="mt-3">
              We specialize in crafting digital concepts that transcend the
              ordinary. With a commitment to pushing boundaries, we strive to
              deliver innovative solutions that captivate audiences and leave a
              lasting impression. Our mission is to redefine what&#39;s possible
              in the digital landscape, one bold idea at a time.
            </p>
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-4">
            <h1 className="txt-color-mid txt-weight-mid">50+</h1>
            <p>Collab buddies</p>
          </div>
          <div className="col-4">
            <h1 className="txt-color-mid txt-weight-mid">4k+</h1>
            <p>Happy dreamers</p>
          </div>
          <div className="col-4">
            <h1 className="txt-color-mid txt-weight-mid">2k+</h1>
            <p>Creative solutions</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
        <div className="img-container">
          <a href="https://storyset.com/work" target="_blank">
            <Image
              src={AboutImg}
              alt="About Image"
              fill
              sizes="100vw"
              placeholder="blur"
              className="img-contain"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
