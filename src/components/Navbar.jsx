import React from "react";
import { FaBell, FaWallet, FaCog } from "react-icons/fa";
import logo from "../logo.svg";

const Navbar = () => (
  <div className="navbar p-5 bg-white shadow-md">
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <div className="text-2xl font-bold mb-4 sm:mb-0">Settings</div>
      <div className="flex flex-wrap justify-center sm:justify-end space-x-4 items-center">
        <div className="text-gray-600 cursor-pointer flex flex-col items-center">
          <FaBell className="mb-1" />
          <span>Notifications</span>
        </div>
        <div className="text-gray-600 cursor-pointer flex flex-col items-center">
          <FaWallet className="mb-1" />
          <span>Wallet</span>
        </div>
        <div className="text-gray-600 cursor-pointer flex flex-col items-center">
          <FaCog className="mb-1" />
          <span>Inquiries</span>
        </div>
        <div className="text-gray-600 cursor-pointer flex flex-col items-center">
          <FaCog className="mb-1" />
          <span>Settings</span>
        </div>
        <img src={logo} alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  </div>
);

export default Navbar;
