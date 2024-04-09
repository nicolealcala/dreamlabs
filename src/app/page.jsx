import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import Loader from "@/components/loader/Loader";

const Home = () => {
  return (
    <div className="row mx-0 py-5">
      <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start gap-3">
        <h1>
          <strong className="txt-size-lg">Your Idea in Motion.</strong>
        </h1>
        <p style={{ width: "90%" }}>
          Where Creativity Meets Community! Join us on a journey of inspiration
          and collaboration, where designers, developers, and aspiring creators
          unite to share ideas, foster innovation, and cultivate a vibrant,
          supportive network.
        </p>

        <div className="py-2">
          <Link href="/about" className="btn primary-btn me-3">
            Learn More
          </Link>
          <Link href="/contact" className="btn secondary-btn ms-2">
            Contact Us
          </Link>
        </div>
        <div className="col-11 brandsContainer my-3">
          <Suspense fallback={<Loader />}>
            <Image
              src="/brands.png"
              alt="Brands"
              fill
              sizes="100vw"
              className="brands img-contain"
            />
          </Suspense>
        </div>
      </div>
      <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
        <a href="https://storyset.com/people" target="_blank">
          <div className="img-container">
            <Image
              src="/home.png"
              alt="Home-Img"
              fill
              sizes="100vw"
              className="img-contain"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
