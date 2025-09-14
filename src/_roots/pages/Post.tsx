import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  BookmarkIcon,
  Heart,
  ArrowLeft,
  MessageSquare,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import type { PostAuth } from "@/types";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostAuth | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // First, fetch the post
        const postResponse = await fetch(`http://localhost:8000/posts/${id}`);
        if (!postResponse.ok) throw new Error("Failed to fetch post");
        const postData = await postResponse.json();

        // Then fetch the author's name
        const userResponse = await fetch(
          `http://localhost:8000/user/${postData.authorId}`
        );
        const userData = (await userResponse.ok)
          ? await userResponse.json()
          : null;

        setPost({
          ...postData,
          authorName: userData?.name || "Unknown Author",
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/Home" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link
            to="/Home"
            className="flex items-center text-blue-500 hover:underline"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <article
          className={`rounded-2xl shadow-sm border p-6 ${
            theme === "light"
              ? "bg-white border-gray-200"
              : "bg-gray-800 border-gray-700"
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
              {post.authorName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <h3
                className={`font-semibold ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                {post.authorName}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          <h1
            className={`text-3xl font-bold mb-4 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            {post.title}
          </h1>

          {post.image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div
            className={`prose max-w-none mb-6 ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            <p className="whitespace-pre-line">{post.content}</p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={`flex items-center space-x-1 ${
                  liked ? "text-red-500" : ""
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                <span>Like</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Comment</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSaved(!saved)}
              className={saved ? "text-blue-500" : ""}
            >
              <BookmarkIcon
                className={`w-5 h-5 mr-1 ${saved ? "fill-current" : ""}`}
              />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Post;
