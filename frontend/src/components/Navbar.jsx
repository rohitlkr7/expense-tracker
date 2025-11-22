import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Toggle dark/light mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-5 py-3 flex justify-between items-center fixed top-0 left-0 z-50">
      {/* Logo */}
      <h1 className="text-xl font-bold text-cyan-700 dark:text-cyan-400">
        💰 Expense Tracker
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-xl transition"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* User Name */}
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          {user?.name}
        </span>

        {/* Profile Avatar */}
        <div className="relative">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=0ea5e9&color=fff`}
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-cyan-500"
            onClick={() => setProfileOpen(!profileOpen)}
          />

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-3xl text-gray-700 dark:text-gray-200"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg py-4 px-5 md:hidden space-y-4">

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-2xl transition"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {user?.name}
          </p>

          <button
            className="w-full text-left px-3 py-2 bg-red-500 text-white rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
