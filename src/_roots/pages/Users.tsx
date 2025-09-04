import UserCard from "@/components/shared/UserCard";
import useTheme from "@/hooks/useTheme";
import { Search, Filter, Users as UsersIcon } from "lucide-react";

const users = [
  { intials: "AO", username: "ayo-ola", bio: "content writer" },
  { intials: "JO", username: "john-oliver", bio: "photographer" },
  { intials: "SM", username: "sarah-miller", bio: "designer" },
  { intials: "MJ", username: "mike-johnson", bio: "developer" },
  { intials: "EW", username: "emma-wilson", bio: "blogger" },
  { intials: "DL", username: "david-lee", bio: "artist" },
];

const Users = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-screen  py-8 px-4 sm:px-6 lg:px-8 ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <UsersIcon className="w-8 h-8 text-blue-600 mr-3" />
            <h1
              className={`text-4xl font-bold ${
                theme === "light" ? "text-gray-900 " : "text-white"
              }`}
            >
              Discover People
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with amazing creators, writers, and artists from around the
            world
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              className={`w-full pl-10 pr-4 py-3 border ${
                theme === "light" ? "" : "text-white"
              } border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200`}
            />
          </div>
          <button className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">Filter</span>
          </button>
        </div>
      </div>

      {/* Users Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <UserCard
              key={`${user.username}-${index}`}
              intials={user.intials}
              username={user.username}
              bio={user.bio}
            />
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
          Load More Users
        </button>
      </div>
    </div>
  );
};

export default Users;
