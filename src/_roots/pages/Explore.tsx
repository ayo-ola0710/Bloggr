import { useEffect, useState } from "react";
import BlogCard from "@/components/shared/BlogCard";
import useTheme from "@/hooks/useTheme";
import usePost from "@/hooks/usePost";
import type { Post } from "@/types";

interface PostWithAuthor extends Post {
  authorName: string;
}

const Explore = () => {
  const { theme } = useTheme();
  const { posts, loading } = usePost();
  const [postsWithAuthors, setPostsWithAuthors] = useState<PostWithAuthor[]>(
    []
  );

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:8000/user");
        if (!response.ok) throw new Error("Failed to fetch users");
        const users = await response.json();

        // Map posts to include author names
        const postsWithAuthorNames = posts.map((post) => {
          const author = users.find((user: any) => user.id === post.authorId);
          return {
            ...post,
            authorName: author ? author.name : "Unknown User",
          };
        });

        setPostsWithAuthors(postsWithAuthorNames);
      } catch (error) {
        console.error("Error fetching authors:", error);
        // Fallback to posts without author names if there's an error
        setPostsWithAuthors(
          posts.map((post) => ({
            ...post,
            authorName: `User ${post.authorId}`,
          }))
        );
      }
    };

    if (posts.length > 0) {
      fetchAuthors();
    }
  }, [posts]);

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto p-6">
        <h1
          className={`text-3xl font-bold mb-8 ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Explore Posts
        </h1>

        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : posts.length > 0 ? (
            postsWithAuthors.length > 0 ? (
              postsWithAuthors.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  authorId={post.authorId}
                  authorName={post.authorName}
                  createdAt={post.createdAt}
                  tags={post.tags}
                  image={post.image}
                />
              ))
            ) : (
              posts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  authorId={post.authorId}
                  authorName={`User ${post.authorId}`}
                  createdAt={post.createdAt}
                  tags={post.tags}
                  image={post.image}
                />
              ))
            )
          ) : (
            <p
              className={`text-center py-10 ${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              No posts to display. Be the first to create a post!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
