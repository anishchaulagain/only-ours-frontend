
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfilesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState<{ id: number; name: string; avatar: string }[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      // Generate random fun names
      const funNames = ["Chill Vibes", "Action Hero", "Binge Master", "Cinephile", "Weekend Warrior"];
      const avatars = [
        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
        "https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg",
        "https://i.pinimg.com/564x/61/54/76/61547625e01d8daf941aae3ffb37f653.jpg",
        "https://i.pinimg.com/564x/b6/77/cd/b677cd1cde292f261166533d6fe75872.jpg"
      ];

      const randomName1 = funNames[Math.floor(Math.random() * funNames.length)];
      let randomName2 = funNames[Math.floor(Math.random() * funNames.length)];
      while (randomName1 === randomName2) {
        randomName2 = funNames[Math.floor(Math.random() * funNames.length)];
      }

      setProfiles([
        { id: 1, name: user.username, avatar: avatars[0] }, // Default user profile
        { id: 2, name: randomName1, avatar: avatars[1] },
        { id: 3, name: randomName2, avatar: avatars[2] },
        { id: 4, name: "Kids", avatar: avatars[3] },
      ]);
    }
  }, [user, isLoading, router]);

  const handleProfileSelect = (name: string) => {
    localStorage.setItem("selectedProfile", name);
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-5xl font-medium mb-8 md:mb-12">Who's watching?</h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="group flex flex-col items-center cursor-pointer gap-2 w-24 md:w-32"
            onClick={() => handleProfileSelect(profile.name)}
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200">
               <Image 
                 src={profile.avatar} 
                 alt={profile.name} 
                 fill 
                 className="object-cover"
               />
            </div>
            <span className="text-gray-400 text-sm md:text-lg group-hover:text-white transition-colors duration-200 text-center">
              {profile.name}
            </span>
          </div>
        ))}
         <div className="group flex flex-col items-center cursor-pointer gap-2 w-24 md:w-32">
             <div className="w-24 h-24 md:w-32 md:h-32 rounded-full md:rounded-md flex items-center justify-center border-2 border-transparent group-hover:bg-white group-hover:text-black hover:border-white transition text-gray-400 bg-transparent">
               <span className="text-5xl font-light">+</span>
             </div>
             <span className="text-gray-400 text-sm md:text-lg group-hover:text-white transition-colors duration-200">
               Add Profile
             </span>
         </div>
      </div>
      <button className="mt-12 md:mt-16 px-6 py-2 border border-gray-500 text-gray-500 hover:text-white hover:border-white transition uppercase tracking-widest text-sm font-medium">
        Manage Profiles
      </button>
    </div>
  );
}
