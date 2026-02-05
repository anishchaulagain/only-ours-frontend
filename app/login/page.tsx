"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token, data.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-opacity-75 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      
      <div className="relative z-10 w-full max-w-md p-12 bg-black/75 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>
        {error && <div className="bg-[#e50914] p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Email or phone number"
              className="w-full p-4 bg-[#333] rounded text-white focus:outline-none focus:bg-[#454545]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-[#333] rounded text-white focus:outline-none focus:bg-[#454545]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-[#e50914] rounded font-bold hover:bg-[#f40612] transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-1" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="hover:underline">Need help?</a>
        </div>

        <div className="mt-16 text-gray-400">
           New to DIPANS? <Link href="/" className="text-white hover:underline">Sign up now</Link>.
        </div>
      </div>
    </div>
  );
}
