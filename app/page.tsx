import HomeClient from "@/components/HomeClient";

async function getVideos() {
  try {
    const res = await fetch("http://localhost:5000/api/videos", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function getGallery() {
  try {
    const res = await fetch("http://localhost:5000/api/gallery", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  const videos = await getVideos();
  const gallery = await getGallery();

  return <HomeClient videos={videos} gallery={gallery} />;
}
