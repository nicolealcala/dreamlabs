"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      className={`nav-link mx-1 ${pathName === item.path && "active"}`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
