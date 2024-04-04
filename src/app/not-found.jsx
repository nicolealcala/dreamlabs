import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="txt-color-mid">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
