import React from "react";
import { Link } from "react-router-dom";
import "../css/pagesstyle.css";

const Navbar: React.FC = () => {
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("token");
    return (window.location.href = "/");
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        {/* <li>
          <Link to="/register" className="navbar-link">Register</Link>
        </li> */}
        <li>
          <Link to="/login" className="navbar-link">
            LOGIN
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
