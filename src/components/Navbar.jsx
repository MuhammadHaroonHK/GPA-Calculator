import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-800 text-white p-4 sticky top-0">
      <div className="md:container xl:container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">GPA Calculator</h1>
        {/* Menu Icon (Visible on small screens) */}
        <button
          onClick={toggleMenu}
          className="block sm:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
        {/* Navbar Links (Hidden on small screens) */}
        <div className="hidden sm:flex space-x-4">
          <a href="#sgpa" className="hover:text-blue-200 transition-all">
            SGPA
          </a>
          <a href="#cgpa" className="hover:text-blue-200 transition-all">
            CGPA
          </a>
          <a href="#history" className="hover:text-blue-200 transition-all">
            History
          </a>
        </div>
      </div>
      {/* Dropdown Menu (Visible on small screens when menu is open) */}
      {isMenuOpen && (
        <div className="sm:hidden mt-2">
          <a
            href="#sgpa"
            className="block py-2 hover:bg-blue-500 transition-all"
            onClick={toggleMenu}
          >
            SGPA
          </a>
          <a
            href="#cgpa"
            className="block py-2 hover:bg-blue-500 transition-all"
            onClick={toggleMenu}
          >
            CGPA
          </a>
          <a
            href="#history"
            className="block py-2 hover:bg-blue-500 transition-all"
            onClick={toggleMenu}
          >
            History
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;