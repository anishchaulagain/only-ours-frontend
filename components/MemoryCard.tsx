"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

interface MemoryCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  date?: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ id, title, thumbnailUrl, date }) => {
  return (
    <Link 
      href={`/watch/${id}`} 
      className="flex-shrink-0 w-[200px] md:w-[260px] group"
    >
      <div className="relative aspect-video rounded overflow-hidden bg-[#141414] card-hover">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-5 h-5 text-[#0a0a0a] fill-[#0a0a0a] ml-0.5" />
          </div>
        </div>
        
        {/* Bottom Gradient & Title */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-medium text-white truncate">{title}</p>
          {date && (
            <p className="text-xs text-gray-400 mt-0.5">{date}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MemoryCard;
