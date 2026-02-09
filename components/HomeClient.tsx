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
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const featured = videos[0];
  const recentMemories = videos.slice(0, 6);
  const favorites = videos.slice(0, 8);

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
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-32 px-4 md:px-12 lg:px-16">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-medium text-[#DC2626] tracking-wider uppercase">
              {greeting}{profileName && `, ${profileName}`}
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-shadow">
              Our Memories
            </h1>
            
            <p className="text-base md:text-lg text-gray-300 max-w-lg leading-relaxed">
              Every moment we've shared, every memory we've made — all in one place. 
              Our story continues here.
            </p>
            
            <div className="flex items-center gap-3 pt-4">
              {featured && (
                <button 
                  onClick={() => router.push(`/watch/${featured._id}`)}
                  className="flex items-center gap-2 btn-primary text-base"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Play
                </button>
              )}
              <button className="flex items-center gap-2 btn-secondary text-base">
                <Info className="w-5 h-5" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <main className="relative z-20 -mt-16 pb-20 space-y-10">
        
        {/* Recent Memories Row */}
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
