import { navItems } from "@/constants/navItems";
import Link from "next/link";

const NavItems = () => {
  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ label, href }) => (
        <Link href={href} key={label}>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
