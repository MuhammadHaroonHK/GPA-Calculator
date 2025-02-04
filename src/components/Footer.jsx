import React from "react";

const Footer = () => {
  return (
    <footer className="text-center mt-10 p-4 bg-slate-800 text-white">
      <p>© {new Date().getFullYear()} Muhammad Haroon. All rights reserved.</p>
      <p>
        <a href="https://github.com/MuhammadHaroonHK" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-all">
          GitHub
        </a> |{" "}
        <a href="https://www.linkedin.com/in/haroon-khan-842ba2298/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-all">
          LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;