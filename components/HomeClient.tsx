"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import MemoryCard from "@/components/MemoryCard";
import { Info, Play } from "lucide-react";
import Link from "next/link";

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
    <div className="relative min-h-screen bg-[#1C1917] text-[#F5E6D3] font-sans selection:bg-[#BE123C] selection:text-white pb-20">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-110 ease-in-out"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=2600&auto=format&fit=crop')" }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#1C1917]" />

        <div className="relative z-10 text-center max-w-4xl px-4 space-y-6 animate-fade-in-up">
          <p className="text-[#BE123C] text-lg md:text-xl font-serif tracking-[0.3em] uppercase mb-4">
            {greeting} {profileName && `, ${profileName}`}
          </p>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-[#F5E6D3] drop-shadow-2xl leading-tight">
             Timeless <span className="text-[#BE123C] italic">Moments</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#F5E6D3]/80 font-light max-w-2xl mx-auto leading-relaxed">
            "Every love story is beautiful, but ours is my favorite."
          </p>
          
          <div className="pt-8">
             {trending.length > 0 && (
                <button 
                  onClick={() => router.push(`/watch/${trending[0]._id}`)}
                  className="group relative px-8 py-4 bg-[#BE123C] text-[#FFE4E6] font-serif text-lg rounded-full overflow-hidden shadow-lg shadow-[#BE123C]/30 hover:shadow-[#BE123C]/50 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    <Play className="w-5 h-5 mr-3 fill-current" /> Watch Our Journey
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </button>
             )}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
           <div className="w-[1px] h-16 bg-gradient-to-b from-[#F5E6D3] to-transparent mx-auto"></div>
           <p className="text-[10px] uppercase tracking-widest text-[#F5E6D3]/50 mt-2">Scroll</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-16 space-y-24 pt-10">
        
        {/* Memory Section 1: Latest */}
        <section>
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-[#44403C] pb-4">
            <div>
              <h2 className="text-4xl font-serif text-[#F5E6D3]">Latest Memories</h2>
              <p className="text-[#A8A29E] mt-2 font-light">The newest chapters in our story</p>
            </div>
            <Link href="/gallery" className="text-[#BE123C] hover:text-[#FFE4E6] transition font-serif italic mt-4 md:mt-0">
              View All &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {trending.map((video) => (
              <div key={video._id} className="tilt-in-fwd-tr">
                 <MemoryCard 
                    id={video._id}
                    title={video.title}
                    thumbnailUrl={video.thumbnailUrl}
                    date="2024" // Placeholder date logic
                 />
              </div>
            ))}
          </div>
        </section>

        {/* Featured / Favorites Section with different layout */}
        <section className="relative py-12">
           <div className="absolute inset-0 bg-[#292524] transform -skew-y-2 -mx-4 md:-mx-16 z-0" />
           <div className="relative z-10">
              <h2 className="text-4xl font-serif text-[#F5E6D3] text-center mb-12">
                <span className="border-b-2 border-[#BE123C] pb-2">Favorites to Rewatch</span>
              </h2>
              
              <div className="flex overflow-x-auto space-x-6 pb-8 snap-x scrollbar-hide">
                {(top10.length > 0 ? top10 : trending).map((video) => (
                   <div key={video._id} className="min-w-[280px] md:min-w-[320px] snap-center">
                      <MemoryCard 
                        id={video._id}
                        title={video.title}
                        thumbnailUrl={video.thumbnailUrl}
                      />
                   </div>
                ))}
              </div>
           </div>
        </section>

        {/* Gallery Preview Grid */}
        <section>
           <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl font-serif text-[#F5E6D3]">Captured Moments</h2>
              <p className="text-[#A8A29E] font-light max-w-md mx-auto">
                "We take photos as a return ticket to a moment otherwise gone."
              </p>
           </div>
           
           <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {gallery.map((item: any, idx: number) => (
                <div key={item._id} className="break-inside-avoid relative group rounded-lg overflow-hidden shadow-xl">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                       <p className="text-[#F5E6D3] font-serif text-sm">{item.title}</p>
                    </div>
                </div>
              ))}
              {gallery.length === 0 && (
                <div className="col-span-full text-center py-20 text-[#44403C]">
                  <p>No photos uploaded yet. Time to make some memories!</p>
                </div>
              )}
           </div>
        </section>

      </div>

      <footer className="mt-32 border-t border-[#44403C] py-12 text-center">
         <p className="font-serif text-[#F5E6D3] text-xl mb-4">D<span className="text-[#BE123C]">&</span>D</p>
         <p className="text-[#A8A29E] text-sm font-light">
           Created with love. Forever and always.
         </p>
      </footer>
    </div>
  );
}
