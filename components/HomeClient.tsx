"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import VideoRow from "@/components/VideoRow";
import { Info, Play } from "lucide-react";

interface HomeClientProps {
  videos: any[];
  gallery: any[];
}

export default function HomeClient({ videos, gallery }: HomeClientProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (user) {
      const storedProfile = localStorage.getItem("selectedProfile");
      if (!storedProfile) {
        router.push("/profiles");
      } else {
        setProfileName(storedProfile);
        
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Simple categorization
  const trending = videos.slice(0, 5);
  const top10 = videos.slice(5, 15);
  const action = videos.filter((v: any) => v.genre.toLowerCase().includes("action"));
  const exclusives = videos.slice(-5);

  return (
    <div className="relative min-h-screen bg-[#141414] text-white font-sans selection:bg-red-600 selection:text-white pb-10">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

        <div className="absolute bottom-[20%] left-4 md:left-16 max-w-xl space-y-4">
          {profileName && (
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 drop-shadow-md mb-2">
              {greeting}, {profileName}
            </h2>
          )}
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">DIPANS ORGINAL</h1>
          <p className="text-sm md:text-lg text-gray-200 drop-shadow-md">
            Dive into the world of cinematic excellence. Experience the thrill, the drama, and the emotion of the best stories ever told. Only on DIPANS.
          </p>
          <div className="flex space-x-3 mt-4">
            {trending.length > 0 && (
              <button 
                onClick={() => router.push(`/watch/${trending[0]._id}`)}
                className="flex items-center px-6 py-2 bg-white text-black rounded font-semibold hover:bg-opacity-80 transition"
              >
                <Play className="w-5 h-5 mr-2 fill-black" /> Play
              </button>
            )}
            <button className="flex items-center px-6 py-2 bg-gray-500/70 text-white rounded font-semibold hover:bg-gray-500/50 transition">
              <Info className="w-5 h-5 mr-2" /> More Info
            </button>
          </div>
        </div>
      </div>

      {/* Video Rows */}
      <div className="relative z-10 -mt-24 space-y-8">
        <VideoRow title="Trending Now" videos={trending} />
        <VideoRow title="Top 10 in Nepal Today" videos={top10.length > 0 ? top10 : trending} />
        <VideoRow title="Action Movies" videos={action.length > 0 ? action : videos} />
        <VideoRow title="New Releases" videos={videos} />
        <VideoRow title="DIPANS Exclusives" videos={exclusives} />
      </div>

      {/* Gallery Section */}
      <div className="px-4 md:px-16 mt-16 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Picture Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {gallery.map((item: any) => (
             <div key={item._id} className="relative aspect-video group cursor-pointer overflow-hidden rounded-md">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                   <p className="text-white font-semibold text-center px-2">{item.title}</p>
                </div>
             </div>
           ))}
           {gallery.length === 0 && <p className="text-gray-500">No images available yet.</p>}
        </div>
      </div>
    </div>
  );
}
