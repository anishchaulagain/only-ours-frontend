"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0a0a0a]/95 backdrop-blur-sm" 
          : "bg-gradient-to-b from-[#0a0a0a]/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 lg:px-16 h-16">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-white hover:text-[#DC2626] transition-colors"
          >
            D<span className="text-[#DC2626]">&</span>D
          </Link>
          
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/" active>Home</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/story">Our Story</NavLink>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded bg-[#DC2626] flex items-center justify-center text-white font-medium text-sm">
                {user ? user.username[0].toUpperCase() : "G"}
              </div>
              <ChevronDown className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#141414] border border-[#262626] rounded shadow-xl z-50 py-1">
                <div className="px-4 py-3 border-b border-[#262626]">
                  <p className="text-sm font-medium text-white">{user?.username}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

function NavLink({ 
  href, 
  children, 
  active = false 
}: { 
  href: string; 
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link 
      href={href} 
      className={`text-sm font-medium transition-colors ${
        active 
          ? "text-white" 
          : "text-gray-400 hover:text-gray-200"
      }`}
    >
      {children}
    </Link>
  );
}

export default Navbar;
