import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div >
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto">

      </div>
    </div>
  );
};

export default MainLayout;
