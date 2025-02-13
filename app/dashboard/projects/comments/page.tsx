'use client';

import { useEffect, useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('/api/comments');
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <a href={`/comments/${comment.id}`}>{comment.comment}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
