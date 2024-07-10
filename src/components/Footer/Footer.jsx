import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-slate-800 text-white py-4 ">
      <ul className="flex justify-center space-x-5">
        <li className="hover:bg-orange-400 rounded-md px-3 py-2 cursor-pointer">
          <Link to="/contact">Contact</Link>
        </li>
        <li
          className="hover:bg-orange-400 rounded-md px-3 py-2 cursor-pointer"
          onClick={() => window.open("https://github.com", "_blank")}
        >
          GitHub
        </li>
        <li
          className="hover:bg-orange-400 rounded-md px-3 py-2 cursor-pointer"
          onClick={() => window.open("https://linkedin.com", "_blank")}
        >
          LinkedIn
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
