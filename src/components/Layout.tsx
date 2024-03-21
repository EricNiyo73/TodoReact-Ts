import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      {/* <Testing /> */}

      <Footer />
    </div>
  );
};

export default Layout;
