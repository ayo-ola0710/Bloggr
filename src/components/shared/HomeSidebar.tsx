import { Link } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { Post } from "@/types";

interface PostWithAuthor extends Post {
  authorName: string;
}

const HomeSidebar = () => {
  const { theme } = useTheme();
  const [trendingPosts, setTrendingPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        // Fetch posts
        const postsResponse = await fetch("http://localhost:8000/posts");
        if (!postsResponse.ok) throw new Error("Failed to fetch posts");
        const posts: Post[] = await postsResponse.json();

        // Get random posts for trending
        const getRandomPosts = (posts: Post[], count: number): Post[] => {
          if (posts.length <= count) return [...posts];
          const shuffled = [...posts].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, count);
        };

        const randomPosts = getRandomPosts(posts, 2);

        // Fetch users to get author names
        const usersResponse = await fetch("http://localhost:8000/user");
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const users = await usersResponse.json();

        const trendingWithAuthors = randomPosts.map((post) => {
          const author = users.find((user: any) => user.id === post.authorId);
          return {
            ...post,
            authorName: author ? author.name : "Unknown User",
          };
        });

        setTrendingPosts(trendingWithAuthors);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={` border-l border-gray-200 h-full overflow-y-auto -pt-3 ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      {/* Header */}
      <div
        className={`sticky top-0  border-b border-gray-100 p-6 -mt-3 z-10 ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-orange-500" />
          <h2
            className={`text-2xl font-bold  ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Trending
          </h2>
        </div>
        <p className="text-sm text-gray-500 ">Popular blogs this week</p>
      </div>

      {/* Trending Blogs */}
      <div className="p-6 space-y-4">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold dark:text-white">
            🔥 Trending Now
          </h3>
          {trendingPosts.length > 0 ? (
            trendingPosts.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className={`block p-4 rounded-lg transition-colors ${
                  theme === "light"
                    ? "bg-white shadow-sm hover:shadow-md"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {post.content}
                </p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>{post.authorName}</span>
                  <span>{Math.ceil(post.content.length / 200)} min read</span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No trending posts to show
            </p>
          )}
        </div>
      </div>

      {/* View All Button */}
      <div className="p-6 pt-0">
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105">
          View All Trending
        </button>
      </div>

      {/* Quick Stats */}
      <div className="p-6 pt-0">
        <div className="bg-gray-50 rounded-2xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3">This Week</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Posts</span>
              <span className="font-semibold text-green-600">+127</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Views</span>
              <span className="font-semibold text-blue-600">45.2K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Writers</span>
              <span className="font-semibold text-purple-600">892</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
