import { useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import { BookmarkIcon, Heart } from "lucide-react";
import { useSavedPosts } from "@/context/SavedPostsContext";
import type { BlogCardProps } from "@/types/index";

const BlogCard = ({
  id,
  title,
  content,
  authorName,
  createdAt,
  tags,
  image,
}: BlogCardProps) => {
  const { theme } = useTheme();
  const { isPostSaved, toggleSavePost, loading: saveLoading } = useSavedPosts();
  const [liked, setLiked] = useState(false);
  const saved = isPostSaved(id);

  // Get author initials for avatar
  const getAuthorInitials = (name: string): string => {
    return name
      .split(" ")
      .map((part: string) => part[0] || "")
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const authorInitials = getAuthorInitials(authorName);

  // Format tags for display
  const renderTags = (tagsArray: string[] | undefined) => {
    if (!tagsArray || tagsArray.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {tagsArray.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`${
        theme === "light" ? "bg-white" : "bg-gray-900"
      } rounded-2xl shadow-sm border border-gray-200 p-6 hover:scale-105 transition-transform cursor-pointer`}
    >
      <Link
        to={`/post/${id}`}
        className="block"
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">{authorInitials}</span>
          </div>
          <div>
            <h3
              className={`font-semibold ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              {authorName}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h2
          className={`text-xl font-bold mb-3 ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          {title}
        </h2>

        {image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
          </div>
        )}

        <p
          className={`mb-4 line-clamp-3 ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          {content}
        </p>

        {renderTags(tags)}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {Math.ceil(content.length / 1000)} min read
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">💬 0</span>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between pt-4">
        <button
          className="text-gray-400 hover:text-blue-500 transition-colors"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await toggleSavePost(id);
          }}
          disabled={saveLoading}
          aria-label={saved ? "Unsave post" : "Save post"}
        >
          <BookmarkIcon
            className={`w-6 h-6 ${saved ? "text-blue-500 fill-current" : ""} ${
              saveLoading ? "opacity-50" : ""
            }`}
          />
        </button>
        <button
          className="text-gray-400 hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked(!liked);
          }}
        >
          <Heart
            className={`w-6 h-6 ${liked ? "text-red-500 fill-current" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
