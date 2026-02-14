"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import MemoryCard from "@/components/MemoryCard";
import { Play, Image as ImageIcon, Film, Grid, List } from "lucide-react";
import Link from "next/link";

interface GalleryClientProps {
  videos: any[];
  gallery: any[];
}

type TabType = "all" | "videos" | "photos";

export default function GalleryClient({ videos, gallery }: GalleryClientProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const tabs = [
    { id: "all" as TabType, label: "All", icon: Grid },
    { id: "videos" as TabType, label: "Videos", icon: Film },
    { id: "photos" as TabType, label: "Photos", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-8 px-4 md:px-12 lg:px-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Gallery</h1>
        <p className="text-gray-400">All our memories in one place</p>
      </div>

      {/* Tabs */}
      <div className="px-4 md:px-12 lg:px-16 mb-8">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-black"
                  : "bg-[#262626] text-gray-300 hover:bg-[#333]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-12 lg:px-16 pb-20">
        {/* Videos Section */}
        {(activeTab === "all" || activeTab === "videos") && videos.length > 0 && (
          <section className="mb-12">
            {activeTab === "all" && (
              <h2 className="text-xl font-semibold mb-4">Videos</h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {videos.map((video: any) => (
                <Link
                  key={video._id}
                  href={`/watch/${video._id}`}
                  className="group"
                >
                  <div className="relative aspect-video rounded overflow-hidden bg-[#141414]">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-300 truncate group-hover:text-white transition-colors">
                    {video.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{video.category}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Photos Section */}
        {(activeTab === "all" || activeTab === "photos") && gallery.length > 0 && (
          <section>
            {activeTab === "all" && (
              <h2 className="text-xl font-semibold mb-4">Photos</h2>
            )}
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
              {gallery.map((item: any) => (
                <div
                  key={item._id}
                  className="break-inside-avoid rounded overflow-hidden group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {videos.length === 0 && gallery.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32">
            <p className="text-gray-500">No memories yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
