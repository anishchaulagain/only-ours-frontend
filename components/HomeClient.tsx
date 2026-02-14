"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import MemoryCard from "@/components/MemoryCard";
import { Play, Info, ChevronRight } from "lucide-react";
import Link from "next/link";

interface HomeClientProps {
  videos: any[];
  gallery: any[];
  categories: any[];
}

export default function HomeClient({ videos, gallery, categories }: HomeClientProps) {
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
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Filter categories for videos
  const videoCategories = categories.filter(cat => cat.type === "video");
  const memories = videos.filter(v => (!v.category || v.category === 'memory'));
  const recentMemories = memories.slice(0, 6);
  const favorites = videos.slice(0, 8);
  const featured = videos[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      {/* Hero Section - Netflix Style */}
      <section className="relative h-[85vh] w-full">
        {/* Background Image */}
        {featured && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('${featured.thumbnailUrl || "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=2600&auto=format&fit=crop"}')`
            }}
          />
        )}
        
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
            {videos.length > 0 && (
              <button 
                onClick={() => router.push(`/watch/${videos[0]._id}`)}
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
      </section>

      {/* Content Sections */}
      <main className="relative z-20 -mt-16 pb-20 space-y-10">
        
        {/* Dynamic Video Category Rows */}
        {videoCategories.map((cat) => {
          const catVideos = videos.filter(v => v.category === cat.name);
          if (catVideos.length === 0) return null;
          
          return (
            <ContentRow 
              key={cat._id}
              title={cat.name.charAt(0).toUpperCase() + cat.name.slice(1) + (cat.name === 'movie' ? 's & Originals' : 's')} 
              href="/gallery"
            >
              {catVideos.map((video) => (
                <MemoryCard 
                  key={video._id}
                  id={video._id}
                  title={video.title}
                  thumbnailUrl={video.thumbnailUrl}
                />
              ))}
            </ContentRow>
          );
        })}

        {/* Recent Memories Row (Fallback/Legacy) */}
        {recentMemories.length > 0 && !videoCategories.some(c => c.name === 'memory') && (
          <ContentRow 
            title="Recent Memories" 
            href="/gallery"
          >
            {recentMemories.map((video) => (
              <MemoryCard 
                key={video._id}
                id={video._id}
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
              />
            ))}
          </ContentRow>
        )}

        {/* Favorites Row */}
        {favorites.length > 0 && (
          <ContentRow 
            title="Favorites" 
            href="/gallery"
          >
            {favorites.map((video) => (
              <MemoryCard 
                key={video._id}
                id={video._id}
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
              />
            ))}
          </ContentRow>
        )}

        {/* Photo Gallery Preview */}
        {gallery.length > 0 && (
          <ContentRow 
            title="Photo Gallery" 
            href="/gallery"
          >
            {gallery.slice(0, 8).map((item: any) => (
              <div 
                key={item._id}
                className="flex-shrink-0 w-[200px] md:w-[240px] aspect-[3/4] rounded overflow-hidden group cursor-pointer card-hover"
              >
                <div className="relative w-full h-full">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="thumbnail-overlay flex items-end p-3">
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </ContentRow>
        )}

        {/* Empty State */}
        {videos.length === 0 && gallery.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 px-4">
            <p className="text-gray-400 text-lg text-center">
              No memories yet. Start creating your story together.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#262626] py-8 px-4 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-2xl font-semibold">
            D<span className="text-[#DC2626]">&</span>D
          </p>
          <p className="text-sm text-gray-500">
            Made with love. Forever and always.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Content Row Component
function ContentRow({ 
  title, 
  href, 
  children 
}: { 
  title: string; 
  href: string; 
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 md:px-12 lg:px-16">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg md:text-xl font-semibold text-white">
          {title}
        </h2>
        <Link 
          href={href}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
        >
          See all <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="row-scroll scrollbar-hide -mx-4 px-4 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16">
        {children}
      </div>
    </section>
  );
}
