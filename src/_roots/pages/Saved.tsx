import { useEffect, useState } from "react";
import BlogCard from "@/components/shared/BlogCard";
import useTheme from "@/hooks/useTheme";
import { useSavedPosts } from "@/context/SavedPostsContext";
import usePost from "@/hooks/usePost";
import type { Post } from "@/types";

interface PostWithAuthor extends Post {
  authorName: string;
}

const Saved = () => {
  const { theme } = useTheme();
  const { savedPosts, loading: savedLoading } = useSavedPosts();
  const { posts, loading: postsLoading } = usePost();
  const [savedPostsData, setSavedPostsData] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPostsData = async () => {
      try {
        setLoading(true);

        // Get all saved post IDs
        const savedPostIds = savedPosts.map((savedPost) => savedPost.postId);

        // Filter posts to only include saved ones
        const savedPostsFromData = posts.filter((post) =>
          savedPostIds.includes(post.id)
        );

        // Fetch author information for each saved post
        const usersResponse = await fetch("http://localhost:8000/user");
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const users = await usersResponse.json();

        // Map posts to include author names
        const postsWithAuthors = savedPostsFromData.map((post) => {
          const author = users.find((user: any) => user.id === post.authorId);
          return {
            ...post,
            authorName: author ? author.name : "Unknown User",
          };
        });

        setSavedPostsData(postsWithAuthors);
      } catch (error) {
        console.error("Error fetching saved posts data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!savedLoading && !postsLoading) {
      fetchSavedPostsData();
    }
  }, [savedPosts, savedLoading, posts, postsLoading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
          Saved Posts
        </h1>

        <div className="space-y-6">
          {savedPostsData.length > 0 ? (
            savedPostsData.map((post) => (
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
            <div className="text-center py-10">
              <p
                className={`text-lg ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {savedLoading || postsLoading
                  ? "Loading..."
                  : "You haven't saved any posts yet. Save posts to see them here!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
