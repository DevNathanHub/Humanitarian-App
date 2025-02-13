'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CommentDetail = () => {
  const { query } = useRouter();
  const { id } = query;
  const [comment, setComment] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchComment = async () => {
        const response = await fetch(`/api/comments/${id}`);
        const data = await response.json();
        setComment(data);
      };

      fetchComment();
    }
  }, [id]);

  if (!comment) return <div>Loading...</div>;

  return (
    <div>
      <h1>Comment</h1>
      <p>{comment.comment}</p>
      <h3>Post Details</h3>
      <p>Post ID: {comment.post.id}</p>
      <p>Post Title: {comment.post.title}</p>
    </div>
  );
};

export default CommentDetail;
