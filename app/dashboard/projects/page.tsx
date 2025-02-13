const getPosts = async () => {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' }); // Fetch without caching
  return res.json();
};

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <a href={`/dashboard/projects/${post.id}`}>{post.title}</a> - {post.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
