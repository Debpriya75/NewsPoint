import React, { useContext, useState, useRef } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Search, Menu, X } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import axios from "axios";

const links = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
];

export const Navbar = ({ setArticles, fetchDefaultNews }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const searchTimeout = useRef(null);

  const handleSearch = (e) => {
    const query = e.target.value.trim();

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // 🔥 When input is empty → load default news
    if (!query) {
      fetchDefaultNews();
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          `/api/search?q=${encodeURIComponent(query)}&max=20&lang=en`
        );
        setArticles(res.data.articles || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="fixed w-full bg-white dark:bg-blue-900 z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="md:text-2xl text-lg font-bold text-blue-600 dark:text-gray-100">
            NewsPoint
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="relative bg-gray-200 p-2 rounded-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search news..."
              className="pl-10 w-[120px] md:w-64 bg-transparent outline-none"
            />
          </div>

          <button
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full bg-red-500 dark:bg-amber-300 flex items-center justify-center"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden dark:text-gray-200"
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          {links.map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-700 dark:text-gray-200"
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
