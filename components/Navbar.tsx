"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
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
          <div className="w-8 h-8 bg-blue-600 rounded cursor-pointer overflow-hidden flex items-center justify-center font-bold uppercase relative group">
             {user ? user.username[0] : "G"}
             <div className="absolute right-0 top-full mt-2 w-32 bg-black border border-gray-700 rounded shadow-xl opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
                <button onClick={logout} className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">
                   <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
