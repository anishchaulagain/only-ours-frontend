"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      // Close if clicking anywhere outside (simplified)
      // In a real app, check if target is inside the dropdown ref
       if (isDropdownOpen) {
          setIsDropdownOpen(false);
       }
    };
    
    // Add a small delay/check or use a specific ref to avoid immediate closing if clicking the toggle button
    // For simplicity, we'll just rely on the toggle button's onClick (which might need stopPropagation if we use window click)
    // Actually, a better way for "click outside" without refs for this specific snippet:
    if(isDropdownOpen) {
        window.addEventListener('click', closeDropdown);
    }
    
    return () => window.removeEventListener('click', closeDropdown);
  }, [isDropdownOpen]);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? "bg-black/90" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="px-4 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-red-600 text-3xl font-bold cursor-pointer">
            DIPANS
          </Link>
          <ul className="hidden md:flex space-x-4 text-sm font-light text-gray-300">
            <li className="cursor-pointer hover:text-white transition">Home</li>
            <li className="cursor-pointer hover:text-white transition">Series</li>
            <li className="cursor-pointer hover:text-white transition">Films</li>
            <li className="cursor-pointer hover:text-white transition">New & Popular</li>
            <li className="cursor-pointer hover:text-white transition">My List</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 text-white">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
          <span className="text-sm cursor-pointer hover:text-gray-300 transition hidden sm:inline">
            {user ? user.username : "Guest"}
          </span>
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
              <div className="relative group">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="w-8 h-8 bg-blue-600 rounded cursor-pointer flex items-center justify-center font-bold uppercase focus:outline-none"
                >
                  {user ? user.username[0] : "G"}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-32 bg-black border border-gray-700 rounded shadow-xl z-50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition text-left"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
