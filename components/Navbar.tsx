import Image from "next/image";
import { ChevronLeft, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white ">
      <nav className="flex-row justify-between items-center flex px-4 pt-1">
        <ChevronLeft className="w-6 h-6" />
        <Image
          src="/Circuit_icon.png"
          alt="Circuit"
          className="mx-auto"
          width={50}
          height={50}
        />
        <Menu />
      </nav>
    </header>
  );
};

export default Navbar;
