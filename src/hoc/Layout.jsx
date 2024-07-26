import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => (
  <div className="dashboard bg-gray-100 min-h-screen">
    <Navbar />
    <div className="container mx-auto mt-10">
      <div className="flex flex-col lg:flex-row gap-7">
        <Sidebar />
        {children}
      </div>
    </div>
  </div>
);

export default Layout;
