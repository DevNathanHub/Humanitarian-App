'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Define types for the Post
interface Post {
  id: string;
  title: string;
  body: string;
  comments: {
    id: string;
    body: string;
  }[];
}

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle redirection to a single post page
  const handlePostClick = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-lg cursor-pointer"
            onClick={() => handlePostClick(post.id)}
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
            <div className="mt-2">
              <span className="text-sm text-gray-500">Comments: {post.comments.length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
