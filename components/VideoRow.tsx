"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface VideoRowProps {
  title: string;
  videos?: { _id: string; thumbnailUrl: string; title: string; videoUrl: string }[];
}

const VideoRow: React.FC<VideoRowProps> = ({ title, videos = [] }) => {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 my-4 space-y-2 text-white">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 hover:text-gray-300 transition cursor-pointer">
        {title}
      </h2>
      <div className="group relative">
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide py-4 px-2">
          {videos.map((video) => (
            <Link href={`/watch/${video._id}`} key={video._id} className="cursor-pointer">
              <div
                className="relative w-[160px] sm:w-[200px] md:w-[240px] h-[90px] sm:h-[112px] md:h-[135px] flex-none rounded-md overflow-hidden hover:scale-105 transition transform duration-300 ease-in-out cursor-pointer group-hover:opacity-100 hover:!opacity-100 opacity-90 shadow-lg"
              >
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition">
                  <p className="text-xs font-bold text-white shadow-black drop-shadow-md">{video.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoRow;
