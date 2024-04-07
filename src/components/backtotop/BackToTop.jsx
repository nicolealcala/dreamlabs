"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import styles from "./backtotop.module.css";
const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          className="btn border-0 py-2"
          id={styles.backToTop}
          onClick={scrollToTop}
        >
          <ArrowUp />
        </button>
      )}
    </>
  );
};

export default BackToTop;
