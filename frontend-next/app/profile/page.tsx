"use client";
import AuthGuard from '@/components/AuthGuard';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { postType } from '@/utils/types';
import Link from 'next/link';

interface Payload {
  id: string;
  email: string;
}

function ProfilePage() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const [profileData, setProfileData] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<postType[]>([]);

  useEffect(() => {
    if (!token) {
      router.push("/auth");
      return;
    }

    const { id } = jwtDecode<Payload>(token);
    getProfileData(id);
  }, []);

  async function getProfileData(id: string) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/profile/${id}`);
      setProfileData((res.data as any).userData);
      setUserPosts((res.data as any).userData.posts);
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  }

  return (
    <AuthGuard>
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="LinkedIn"
            width={32}
            height={32}
            className="hover:opacity-80 transition"
          />
          
        </div>
        <div className="flex gap-4 items-center">
            <Link href={'/feed'}><p  className="text-gray-600 hover:text-indigo-600 transition font-medium">Home</p></Link>
            <Link href={'/profile'}><p className="text-gray-600 hover:text-indigo-600 transition font-medium">Profile</p></Link>

          <button
            onClick={() => {
              localStorage.clear();
              router.push("/auth");
            }}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Background & Content */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-8">

        {/* Profile Hero */}
        {profileData && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-6 mb-12">
            <img
              src={profileData.profileImg}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-200 shadow-sm"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{profileData.username}</h1>
              <p className="text-gray-500">{profileData.email}</p>
              {profileData.bio && (
                <p className="mt-4 px-4 py-3 bg-indigo-50 border-l-4 border-indigo-400 text-indigo-900 text-sm rounded-md shadow-sm leading-relaxed">{profileData.bio}</p>
              )}
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <div
              key={post.username+post.createdAt}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-200 p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-4">{post.description}</p>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}

export default ProfilePage;
