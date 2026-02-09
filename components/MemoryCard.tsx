"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

interface MemoryCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  date?: string; // Optional date for the memory
}

const MemoryCard: React.FC<MemoryCardProps> = ({ id, title, thumbnailUrl, date }) => {
  return (
    <Link href={`/watch/${id}`} className="block group">
      <div className="relative bg-[#F5E6D3] p-3 pb-8 shadow-lg transform transition duration-500 hover:scale-105 hover:rotate-1 hover:z-10 cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:sepia-[.3]"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full border border-white/50">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="font-serif text-[#1C1917] text-lg font-medium leading-tight group-hover:text-[#BE123C] transition-colors">
            {title}
          </h3>
          {date && (
            <p className="font-sans text-[#44403C] text-xs mt-1 uppercase tracking-widest">
              {date}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MemoryCard;
