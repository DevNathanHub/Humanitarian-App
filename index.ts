import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // USERS
  const users = await prisma.user.findMany({
    include: {
      posts: {
        include: {
          comments: true, // Include comments for each post
        },
      },
    },
  });
  console.log("users", users);

  // POSTS
  const posts = await prisma.post.findMany({
    include: {
      comments: true, // Include comments for each post
    },
  });
  console.log("posts", posts);

  // COMMENTS
  const comments = await prisma.comment.findMany({
    include: {
      post: true, // Include post for each comment
    },
  });
  console.log("comments", comments);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
