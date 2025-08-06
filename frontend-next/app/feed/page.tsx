"use client";

import { postType } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '@/components/Post';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';


function Page() {
  const [posts, setPosts] = useState<postType[]>([]);
  const router = useRouter();

  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}post`);
      const dataArray: postType[] = (response.data as any).postArray.map((post: any) => ({
        username: post.user.username,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt
      }));
      setPosts(dataArray);
    } catch (error) {
      console.error("Error while fetching post data", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
   <AuthGuard>
     <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-200">
      
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-md py-4 px-6 flex justify-between items-center sticky p-2 top-0 z-10 border-b border-gray-200">
        <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              width={36}
              height={36}
              className="hover:opacity-80 transition"
            />
        
        <div className="flex gap-4 items-center">
           <Link href={'/feed'}><p  className="text-gray-600 hover:text-indigo-600 transition font-medium">Home</p></Link>
            <Link href={'/profile'}><p className="text-gray-600 hover:text-indigo-600 transition font-medium">Profile</p></Link>
          <button className='p-2 rounded-xl bg-cyan-400 text-white font-bold  ' onClick={()=>{localStorage.clear(); router.push("/auth")}}>Logout</button>
        </div>
      </nav>

      {/* Posts */}
      <main className="p-6 max-w-3xl mx-auto mt-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No posts available yet.</p>
        ) : (
          posts.map((post, index) => (
            <Post key={index} {...post} />
          ))
        )}
      </main>
    </div>
   </AuthGuard>
  );
}

export default Page;
