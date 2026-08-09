import Image from "next/image";
import { ChevronLeft, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white ">
      <nav className="flex-row justify-between items-center flex p-4">
        <ChevronLeft className="w-6 h-6" />
        <Image
          src="/Circuit_icon.png"
          alt="Circuit"
          className="mx-auto"
          width={80}
          height={80}
        />
        <Menu />
      </nav>
    </header>
  );
};

export default Navbar;
