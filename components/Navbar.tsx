"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Search, LogOut } from "lucide-react";
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
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ${
        isScrolled ? "bg-[#1C1917]/90 backdrop-blur-md py-4 shadow-md" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        {/* Left Links */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/story">Our Story</NavLink>
        </div>

        {/* Logo */}
        <Link href="/" className="text-3xl md:text-5xl font-serif font-bold text-[#F5E6D3] tracking-widest hover:text-[#BE123C] transition-colors duration-500">
          D<span className="text-[#BE123C]">&</span>D
        </Link>

        {/* Right Links & User */}
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-8">
             <NavLink href="/gallery">Gallery</NavLink>
             <NavLink href="/bucket-list">Dreams</NavLink>
          </div>
          
          {/* User Profile */}
          <div className="relative group">
            <button 
               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#BE123C] flex items-center justify-center text-[#FFE4E6] font-serif font-bold border border-[#FFE4E6]/20">
                {user ? user.username[0] : "G"}
              </div>
            </button>
             {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-4 w-40 bg-[#292524] border border-[#44403C] rounded-none shadow-xl z-50 py-2">
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-2 text-sm text-[#F5E6D3] hover:bg-[#BE123C]/20 hover:text-[#BE123C] transition font-sans tracking-wide"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="text-[#F5E6D3]/80 hover:text-[#BE123C] font-sans text-sm tracking-[0.2em] uppercase transition-all duration-300 relative group"
  >
    {children}
    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#BE123C] transition-all duration-300 group-hover:w-full" />
  </Link>
);

export default Navbar;
