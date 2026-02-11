
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";

async function getVideo(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await getVideo(id);

  if (!video) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <Link href="/" className="text-red-600 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Back Button Overlay */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/" className="flex items-center text-white/50 hover:text-white transition">
          <ArrowLeft className="w-8 h-8 mr-2" />
          <span className="text-lg font-semibold">Back to Browse</span>
        </Link>
      </div>

      {/* Video Player */}
      <div className="w-full h-screen flex items-center justify-center">
        <VideoPlayer videoUrl={video.videoUrl} poster={video.thumbnailUrl} />
      </div>
    </div>
  );
}
