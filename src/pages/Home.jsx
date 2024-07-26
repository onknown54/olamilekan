import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import ErrorPopup from "../components/ErrorPopup";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Layout from "../hoc/Layout";

const fallbackUsers = [
  { name: "John Doe", email: "john@example.com", role: "Sales Manager" },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Sales Representative",
  },
  // Add more sample users if needed
];

const Home = () => {
  const [users, setUsers] = useState(fallbackUsers); // Set fallback data initially
  const [roles, setRoles] = useState([
    "Administrator",
    "Sales Manager",
    "Sales Representative",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://onknown54.free.beeceptor.com/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      setError("Error fetching users: " + error.message);
      // Set fallback data in case of error
      setUsers(fallbackUsers);
    }
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const validateUser = (user) => {
    const { name, email, role } = user;
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      /\S+@\S+\.\S+/.test(email) &&
      role.trim() !== ""
    );
  };

  const handleAddUser = async () => {
    if (validateUser(newUser)) {
      try {
        await axios.post(
          "https://onknown54.free.beeceptor.com/api/users",
          newUser
        );
        setUsers((prev) => [...prev, newUser]);
        setNewUser({ name: "", email: "", role: "" });
        setIsModalOpen(false);
      } catch (error) {
        setError("Error adding user: " + error.message);
      }
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = async () => {
    if (validateUser(currentUser)) {
      try {
        await axios.put(
          `https://onknown54.free.beeceptor.com/api/users/${currentUser.email}`,
          currentUser
        );
        setUsers((prev) =>
          prev.map((user) =>
            user.email === currentUser.email ? currentUser : user
          )
        );
        setCurrentUser(null);
        setIsEditModalOpen(false);
      } catch (error) {
        setError("Error updating user: " + error.message);
      }
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handleRemoveUser = async () => {
    try {
      await axios.delete(
        `https://onknown54.free.beeceptor.com/api/users/${currentUser.email}`
      );
      setUsers((prev) =>
        prev.filter((user) => user.email !== currentUser.email)
      );
      setCurrentUser(null);
      setIsRemoveModalOpen(false);
    } catch (error) {
      setError("Error removing user: " + error.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole ? user.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <Layout>
        <div className="lg:w-3/4">
          <nav className="text-gray-600 mb-4">
            <span>Settings</span> /{" "}
            <span className="text-blue-600">Users & Roles</span>
          </nav>
          <h2 className="text-2xl font-bold mb-2">Users & Roles</h2>
          <p className="text-gray-600 mb-4">
            Manage all users in your business
          </p>

          {/* Tabs Navigation */}
          <div className="mb-6">
            <ul className="flex flex-wrap border-b border-gray-300">
              <li
                onClick={() => setActiveTab("users")}
                className={`cursor-pointer py-2 px-4 ${
                  activeTab === "users"
                    ? "border-b-2 border-blue-600 font-bold text-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                Users
              </li>
              <li
                onClick={() => setActiveTab("roles")}
                className={`cursor-pointer py-2 px-4 ${
                  activeTab === "roles"
                    ? "border-b-2 border-blue-600 font-bold text-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                Roles
              </li>
            </ul>
          </div>

          {activeTab === "users" && (
            <div className="bg-white p-6 shadow-md rounded-md mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
                  <input
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full sm:w-auto"
                  />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full sm:w-auto"
                  >
                    <option value="">Filter by role</option>
                    {roles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    <FaUserPlus className="mr-2" />
                    Add New User
                  </button>
                </div>
              </div>

              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="border px-6 py-4 text-left">Name</th>
                    <th className="border px-6 py-4 text-left">Email</th>
                    <th className="border px-6 py-4 text-left">Role</th>
                    <th className="border px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="border px-6 py-4">{user.name}</td>
                      <td className="border px-6 py-4">{user.email}</td>
                      <td className="border px-6 py-4">{user.role}</td>
                      <td className="border px-6 py-4 flex justify-center space-x-4">
                        <button
                          onClick={() => {
                            setCurrentUser(user);
                            setIsEditModalOpen(true);
                          }}
                          className="text-yellow-500 hover:text-yellow-700 focus:outline-none"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentUser(user);
                            setIsRemoveModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "roles" && (
            <div className="bg-white p-6 shadow-md rounded-md">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => {
                    const role = prompt("Enter new role:");
                    if (role && !roles.includes(role)) {
                      setRoles((prevRoles) => [...prevRoles, role]);
                    }
                  }}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  <FaUserPlus className="mr-2" />
                  Add New Role
                </button>
              </div>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="border px-6 py-4 text-left">Role</th>
                    <th className="border px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="border px-6 py-4">{role}</td>
                      <td className="border px-6 py-4 flex justify-center">
                        <button
                          onClick={() => {
                            const updatedRole = prompt("Edit role:", role);
                            if (updatedRole && updatedRole !== role) {
                              setRoles((prevRoles) =>
                                prevRoles.map((r) =>
                                  r === role ? updatedRole : r
                                )
                              );
                            }
                          }}
                          className="text-yellow-500 hover:text-yellow-700 focus:outline-none"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete the role "${role}"?`
                              )
                            ) {
                              setRoles((prevRoles) =>
                                prevRoles.filter((r) => r !== role)
                              );
                            }
                          }}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Layout>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Add New User</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleNewUserChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleNewUserChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleNewUserChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Select role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleEditUserChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleEditUserChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={currentUser.role}
                onChange={handleEditUserChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Select role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove User Modal */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Remove User</h2>
            <p>
              Are you sure you want to remove{" "}
              <strong>{currentUser.name}</strong>?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsRemoveModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Remove User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
