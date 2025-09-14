import { useEffect, useState } from "react";
import HomeSidebar from "@/components/shared/HomeSidebar";
import BlogCard from "@/components/shared/BlogCard";
import useTheme from "@/hooks/useTheme";
import usePost from "@/hooks/usePost";
import type { Post } from "@/types";

interface PostWithAuthor extends Post {
  authorName: string;
}

const Home = () => {
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
            authorName: "User",
          }))
        );
      }
    };

    if (posts.length > 0) {
      fetchAuthors();
    }
  }, [posts]);

  return (
    <main className={`min-h-screen ${
      theme === "light" ? "bg-gray-50" : "bg-gray-900"
    }`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Main Content Area */}
        <div className="lg:col-span-2 p-6">
          {/* Feed Content */}
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
              <p>No posts yet. Create your first post!</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 hidden md:block">
          <HomeSidebar />
        </div>
      </div>
    </main>
  );
};

export default Home;
