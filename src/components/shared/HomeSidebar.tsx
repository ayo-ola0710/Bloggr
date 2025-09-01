import { TrendingUp, Clock, Eye, MessageCircle, Bookmark } from "lucide-react";

interface TrendingBlog {
  id: number;
  title: string;
  description: string;
  author: string;
  readTime: string;
  views: number;
  comments: number;
  category: string;
}

const trendingBlogs: TrendingBlog[] = [
  {
    id: 1,
    title: "Life as a Developer",
    description: "Essential things every developer should know in 2024",
    author: "John Doe",
    readTime: "5 min",
    views: 1200,
    comments: 24,
    category: "Tech",
  },
  {
    id: 2,
    title: "Modern Web Design",
    description: "Latest trends and best practices in web design",
    author: "Sarah Wilson",
    readTime: "8 min",
    views: 890,
    comments: 15,
    category: "Design",
  },
  // {
  //   id: 3,
  //   title: "AI Revolution",
  //   description: "How artificial intelligence is changing our world",
  //   author: "Mike Chen",
  //   readTime: "12 min",
  //   views: 2100,
  //   comments: 45,
  //   category: "AI"
  // },
  // {
  //   id: 4,
  //   title: "Remote Work Tips",
  //   description: "Productivity hacks for working from home",
  //   author: "Emma Davis",
  //   readTime: "6 min",
  //   views: 756,
  //   comments: 18,
  //   category: "Lifestyle"
  // }
];

const HomeSidebar = () => {
  return (
    <div className="bg-white border-l border-gray-200 h-full overflow-y-auto -pt-3 ">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 p-6 -mt-3 z-10">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900">Trending</h2>
        </div>
        <p className="text-sm text-gray-500 ">Popular blogs this week</p>
      </div>

      {/* Trending Blogs */}
      <div className="p-6 space-y-4">
        {trendingBlogs.map((blog, index) => (
          <div
            key={blog.id}
            className="group bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer"
          >
            {/* Ranking Badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                    {blog.title}
                  </h3>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {blog.description}
            </p>

            {/* Category Badge */}
            <div className="mb-3">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {blog.category}
              </span>
            </div>

            {/* Author and Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{blog.author}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{blog.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{blog.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
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
