import HomeClient from "@/components/HomeClient";

async function getVideos() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function getGallery() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, { cache: "no-store" });
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
  const categories = await getCategories();

  return <HomeClient videos={videos} gallery={gallery} categories={categories} />;
}
