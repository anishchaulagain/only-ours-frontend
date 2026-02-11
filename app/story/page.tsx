"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Heart, Calendar, MapPin } from "lucide-react";

export default function StoryPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Timeline data - customize with your actual dates
  const milestones = [
    {
      date: "When it began",
      title: "First Met",
      description: "The day our paths crossed for the first time.",
      icon: Heart,
    },
    {
      date: "A special moment",
      title: "First Date",
      description: "Our first official date together.",
      icon: Calendar,
    },
    {
      date: "The adventure continues",
      title: "Traveled Together",
      description: "Our first trip as a couple.",
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <div className="pt-24 pb-16 px-4 md:px-12 lg:px-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Every love story is beautiful, but ours is my favorite.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto px-4 pb-20">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#262626]" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex gap-6">
                {/* Icon */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center flex-shrink-0">
                  <milestone.icon className="w-5 h-5 text-[#DC2626]" />
                </div>

                {/* Content */}
                <div className="pt-1">
                  <p className="text-sm text-[#DC2626] font-medium mb-1">
                    {milestone.date}
                  </p>
                  <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-400 text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#262626] py-8 px-4 text-center">
        <p className="text-sm text-gray-500">
          This is just the beginning...
        </p>
      </footer>
    </div>
  );
}
