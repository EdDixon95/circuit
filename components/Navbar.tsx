import Image from "next/image";
import { ChevronLeft, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white ">
      <nav className="flex-row justify-between items-center flex pt-1 pr-5 pl-3">
        <Image src="/Circuit_icon.png" alt="Circuit" width={50} height={50} />
        <Menu />
      </nav>
    </header>
  );
};

export default Navbar;
