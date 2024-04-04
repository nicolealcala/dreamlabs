import Link from "next/link";
import Links from "./Links";
import "./navbar.css";

const Navbar = async () => {
  return (
    <nav className="navbar navbar-expand-lg " data-bs-theme="dark">
      <div className="container-fluid px-0 pt-2">
        <Link className="navbar-brand ms-3" href="/">
          <span id="logo">dreamlabs</span>
        </Link>
        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end linksDiv"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <Link href="/" className="navbar-brand">
              <h5
                className="offcanvas-title txt-weight-mid"
                id="offcanvasNavbarLabel"
              >
                <span id="logo">dreamlabs</span>
              </h5>
            </Link>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body justify-content-end">
            <Links />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
