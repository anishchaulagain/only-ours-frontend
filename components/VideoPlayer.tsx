"use client";

import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  poster: string;
}

export default function VideoPlayer({ videoUrl, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-contain focus:outline-none"
      controls
      autoPlay
      src={videoUrl}
      poster={poster}
    >
      Your browser does not support the video tag.
    </video>
  );
}
