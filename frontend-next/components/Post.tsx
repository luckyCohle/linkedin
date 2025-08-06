import { postType } from '@/utils/types';
import React from 'react';

function Post(postObj: postType) {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 mb-6 border border-gray-200 transition-all hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{postObj.title}</h2>
        <span className="text-sm text-gray-500">{new Date(postObj.createdAt).toLocaleDateString()}</span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-4">{postObj.description}</p>

      <div className="flex items-center gap-3 mt-2">
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
          {postObj.username?.[0]?.toUpperCase()}
        </div>
        <span className="text-sm text-gray-600">Posted by <strong>{postObj.username}</strong></span>
      </div>
    </div>
  );
}

export default Post;
