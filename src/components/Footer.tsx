import React from "react";
import "../css/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
