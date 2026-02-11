"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LayoutDashboard, Users, Video, Image as ImageIcon, LogOut, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user, logout, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({ users: 0, videos: 0, distinctGenres: 0 });
  
  const [users, setUsers] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  // Form states
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "user" });
  const [newVideo, setNewVideo] = useState({ title: "", description: "", videoUrl: "", thumbnailUrl: "", genre: "", duration: "", year: 2025 });
  const [newImage, setNewImage] = useState({ title: "", imageUrl: "", description: "" });

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== "admin") {
        router.push("/login"); // Redirect if not admin
      } else {
        fetchData();
      }
    }
  }, [user, authLoading, router]);

  const fetchData = async () => {
    try {
      if (!token) return;
      
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, videosRes, galleryRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`),
      ]);

      const usersData = await usersRes.json();
      const videosData = await videosRes.json();
      const galleryData = await galleryRes.json();

      setUsers(usersData);
      setVideos(videosData);
      setGallery(galleryData);
      
      const genres = new Set(videosData.map((v: any) => v.genre));
      setStats({ users: usersData.length, videos: videosData.length, distinctGenres: genres.size });

    } catch (error) {
      console.error("Error fetching admin data", error);
    }
  };

  const handleDelete = async (endpoint: string, id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchData(); // Refresh data
    } catch (error) {
        console.error("Delete failed", error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify(newUser)
          });
          setNewUser({ username: "", email: "", password: "", role: "user" });
          fetchData();
          alert("User created!");
      } catch (error) { console.error(error); }
  };

  const handleCreateVideo = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify(newVideo)
          });
          setNewVideo({ title: "", description: "", videoUrl: "", thumbnailUrl: "", genre: "", duration: "", year: 2025 });
          fetchData();
          alert("Video added!");
      } catch (error) { console.error(error); }
  };

  const handleCreateImage = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify(newImage)
          });
          setNewImage({ title: "", imageUrl: "", description: "" });
          fetchData();
          alert("Image added!");
      } catch (error) { console.error(error); }
  };

  if (authLoading || !user) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="flex h-screen bg-[#141414] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-[#333] hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-red-600">DIPANS</h1>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button onClick={() => setActiveTab("dashboard")} className={`flex w-full items-center px-4 py-3 rounded transition ${activeTab === "dashboard" ? "bg-[#e50914] text-white" : "text-gray-400 hover:bg-[#333]"}`}>
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </button>
          <button onClick={() => setActiveTab("users")} className={`flex w-full items-center px-4 py-3 rounded transition ${activeTab === "users" ? "bg-[#e50914] text-white" : "text-gray-400 hover:bg-[#333]"}`}>
            <Users className="w-5 h-5 mr-3" /> Users
          </button>
          <button onClick={() => setActiveTab("videos")} className={`flex w-full items-center px-4 py-3 rounded transition ${activeTab === "videos" ? "bg-[#e50914] text-white" : "text-gray-400 hover:bg-[#333]"}`}>
            <Video className="w-5 h-5 mr-3" /> Movies
          </button>
          <button onClick={() => setActiveTab("gallery")} className={`flex w-full items-center px-4 py-3 rounded transition ${activeTab === "gallery" ? "bg-[#e50914] text-white" : "text-gray-400 hover:bg-[#333]"}`}>
            <ImageIcon className="w-5 h-5 mr-3" /> Gallery
          </button>
        </nav>
        <div className="p-4 border-t border-[#333]">
           <button onClick={logout} className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition w-full">
             <LogOut className="w-5 h-5 mr-3" /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold capitalize">{activeTab}</h2>
          <div className="flex items-center space-x-4">
             <span className="text-sm text-gray-400">Welcome, {user.username}</span>
             <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold uppercase">{user.username[0]}</div>
          </div>
        </header>

        {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#2f2f2f] p-6 rounded-lg shadow-lg">
                    <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
                    <p className="text-3xl font-bold mt-2">{stats.users}</p>
                </div>
                <div className="bg-[#2f2f2f] p-6 rounded-lg shadow-lg">
                    <h3 className="text-gray-400 text-sm font-medium">Active Movies</h3>
                    <p className="text-3xl font-bold mt-2">{stats.videos}</p>
                </div>
                <div className="bg-[#2f2f2f] p-6 rounded-lg shadow-lg">
                    <h3 className="text-gray-400 text-sm font-medium">Distinct Genres</h3>
                    <p className="text-3xl font-bold mt-2">{stats.distinctGenres}</p>
                </div>
            </div>
        )}

        {/* Users Management */}
        {activeTab === "users" && (
            <div className="space-y-6">
                <div className="bg-[#1f1f1f] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Add New User</h3>
                    <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input type="text" placeholder="Username" className="p-2 bg-[#333] rounded" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} required />
                        <input type="email" placeholder="Email" className="p-2 bg-[#333] rounded" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required />
                        <input type="password" placeholder="Password" className="p-2 bg-[#333] rounded" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} required />
                        <select className="p-2 bg-[#333] rounded" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button type="submit" className="md:col-span-4 bg-red-600 p-2 rounded font-bold hover:bg-red-700">Create User</button>
                    </form>
                </div>
                
                <div className="bg-[#1f1f1f] rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#141414] text-gray-400 text-sm">
                            <tr><th className="px-6 py-3">Username</th><th className="px-6 py-3">Email</th><th className="px-6 py-3">Role</th><th className="px-6 py-3">Action</th></tr>
                        </thead>
                        <tbody className="divide-y divide-[#333]">
                            {users.map((u: any) => (
                                <tr key={u._id}>
                                    <td className="px-6 py-3">{u.username}</td>
                                    <td className="px-6 py-3">{u.email}</td>
                                    <td className="px-6 py-3">{u.role}</td>
                                    <td className="px-6 py-3">
                                        <button onClick={() => handleDelete("users", u._id)} className="text-red-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* Videos Management */}
        {activeTab === "videos" && (
            <div className="space-y-6">
                <div className="bg-[#1f1f1f] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Add New Movie</h3>
                    <form onSubmit={handleCreateVideo} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Title" className="p-2 bg-[#333] rounded" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} required />
                        <input type="text" placeholder="Description" className="p-2 bg-[#333] rounded" value={newVideo.description} onChange={e => setNewVideo({...newVideo, description: e.target.value})} required />
                        <input type="text" placeholder="Video URL" className="p-2 bg-[#333] rounded" value={newVideo.videoUrl} onChange={e => setNewVideo({...newVideo, videoUrl: e.target.value})} required />
                        <input type="text" placeholder="Thumbnail URL" className="p-2 bg-[#333] rounded" value={newVideo.thumbnailUrl} onChange={e => setNewVideo({...newVideo, thumbnailUrl: e.target.value})} required />
                        <input type="text" placeholder="Genre" className="p-2 bg-[#333] rounded" value={newVideo.genre} onChange={e => setNewVideo({...newVideo, genre: e.target.value})} required />
                         <input type="number" placeholder="Year" className="p-2 bg-[#333] rounded" value={newVideo.year} onChange={e => setNewVideo({...newVideo, year: parseInt(e.target.value)})} />
                        <button type="submit" className="md:col-span-2 bg-red-600 p-2 rounded font-bold hover:bg-red-700">Add Movie</button>
                    </form>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {videos.map((v: any) => (
                        <div key={v._id} className="relative bg-[#2f2f2f] rounded overflow-hidden group">
                           <img src={v.thumbnailUrl} alt={v.title} className="w-full h-32 object-cover" />
                           <div className="p-2">
                               <h4 className="font-bold truncate">{v.title}</h4>
                               <p className="text-xs text-gray-400">{v.genre}</p>
                           </div>
                           <button onClick={() => handleDelete("videos", v._id)} className="absolute top-2 right-2 bg-red-600 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    ))}
                </div>
            </div>
        )}

         {/* Gallery Management */}
         {activeTab === "gallery" && (
            <div className="space-y-6">
                <div className="bg-[#1f1f1f] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Add Gallery Image</h3>
                    <form onSubmit={handleCreateImage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Title" className="p-2 bg-[#333] rounded" value={newImage.title} onChange={e => setNewImage({...newImage, title: e.target.value})} required />
                        <input type="text" placeholder="Image URL" className="p-2 bg-[#333] rounded" value={newImage.imageUrl} onChange={e => setNewImage({...newImage, imageUrl: e.target.value})} required />
                        <input type="text" placeholder="Description" className="p-2 bg-[#333] rounded md:col-span-2" value={newImage.description} onChange={e => setNewImage({...newImage, description: e.target.value})} />
                        <button type="submit" className="md:col-span-2 bg-red-600 p-2 rounded font-bold hover:bg-red-700">Add Image</button>
                    </form>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gallery.map((g: any) => (
                        <div key={g._id} className="relative bg-[#2f2f2f] rounded overflow-hidden group">
                           <img src={g.imageUrl} alt={g.title} className="w-full h-32 object-cover" />
                           <div className="p-2">
                               <h4 className="font-bold truncate">{g.title}</h4>
                           </div>
                           <button onClick={() => handleDelete("gallery", g._id)} className="absolute top-2 right-2 bg-red-600 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </main>
    </div>
  );
}
