import NavLink from "./NavLink";
import Link from "next/link";
import { logout } from "@/lib/actions";
import "./navbar.css";
import { auth } from "@/lib/auth";

const links = [
  { path: "/", title: "Home" },
  { path: "/about-us", title: "About" },
  { path: "/contact", title: "Contact" },
  { path: "/blogs", title: "Blogs" },
];

const Links = async () => {
  const session = await auth();

  return (
    <>
      {links.map((link) => (
        <NavLink item={link} key={link.path} />
      ))}

      {session?.user ? (
        <>
          {session.user?.isAdmin && (
            <NavLink item={{ path: "/admin", title: "Admin" }} />
          )}

          <hr className="d-lg-none" />

          <form action={logout}>
            <button id="logOut" className="mx-1">
              Log out | {session.user.username || session.user.name}
            </button>
          </form>
        </>
      ) : (
        <>
          <hr className="d-lg-none" />
          <Link href="/login" id="login" className="mx-1">
            Log in
          </Link>
        </>
      )}
    </>
  );
};

export default Links;
