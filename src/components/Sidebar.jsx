import React from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaDollarSign,
  FaChartLine,
  FaUsers,
  FaDatabase,
} from "react-icons/fa";

const Sidebar = () => (
  <div className="lg:w-1/4 bg-white p-6 rounded-md shadow-md">
    <div>
      <h2 className="font-bold mb-4 text-xl">Settings</h2>
      <ul className="text-gray-600">
        <li className="mb-2 cursor-pointer flex items-center p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition">
          <FaUser className="mr-2" /> Account
        </li>
        <li className="mb-2 cursor-pointer flex items-center p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition">
          <FaLock className="mr-2" /> Security
        </li>
        <li className="mb-2 cursor-pointer flex items-center p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition">
          <FaBell className="mr-2" /> Notifications
        </li>
        <li className="mb-2 cursor-pointer flex items-center p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition">
          <FaDollarSign className="mr-2" /> Pricing
        </li>
        <li className="mb-2 cursor-pointer flex items-center p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition">
          <FaChartLine className="mr-2" /> Sales
        </li>
        <li className="mb-2 cursor-pointer flex items-center p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition text-blue-600">
          <FaUsers className="mr-2" /> Users & Roles
        </li>
        <li className="mb-2 cursor-pointer flex items-center p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition">
          <FaDatabase className="mr-2" /> Backups
        </li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
