import useTheme from "@/hooks/useTheme";
import { BookmarkIcon, Heart } from "lucide-react";
import type { BlogCardProps } from "@/types";

const BlogCard = ({ inital, name, time, topic, writeup }: BlogCardProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={` ${
        theme === "light" ? "bg-white" : " bg-gray-900 "
      }  rounded-2xl shadow-sm border border-gray-200 p-6 hover:scale-105`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{inital}</span>
        </div>
        <div>
          <h3
            className={`font-semibold ${
              theme === "light" ? "text-gray-900" : " text-white "
            }`}
          >
            {name}
          </h3>
          <p className="text-sm text-gray-500">{time} hours ago</p>
        </div>
      </div>
      <h2
        className={`text-xl font-boldtext-gray-900 mb-3 ${
          theme === "light" ? "text-gray-900" : " text-white "
        }`}
      >
        {topic}
      </h2>
      <p
        className={` mb-4 ${
          theme === "light" ? "text-gray-600" : " text-white "
        }`}
      >
        {writeup}
      </p>
      <div className="flex items-center justify-between border-b border-gray-300 pb-3">
        <div
          className={`flex items-center space-x-4 text-sm  ${
            theme === "light" ? "text-gray-500" : " text-white "
          }`}
        >
          <span>5 min ago</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={` hover:text-blue-500 transition-colors ${
              theme === "light" ? "text-gray-400" : " text-white "
            }`}
          >
            💬 8
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between pt-5 ">
        <button className="text-gray-400 hover:text-red-500 transition-colors">
          <BookmarkIcon className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-blue-500 transition-colors">
          <Heart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
