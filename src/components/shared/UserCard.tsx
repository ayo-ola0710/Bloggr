import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, MessageCircle } from "lucide-react";
import type { UserCardProps } from "@/types";

const UserCard = ({ intials, username, bio }: UserCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 w-full max-w-sm mx-auto">
      {/* Header with Avatar */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-4">
          <Avatar className="w-20 h-20 ring-4 ring-blue-100">
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {intials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        {/* User Info */}
        <div className="text-center space-y-1">
          <h3 className="text-xl font-semibold text-gray-900 capitalize">
            {username.replace("-", " ")}
          </h3>
          <p className="text-sm text-gray-500 capitalize font-medium">{bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center space-x-6 mb-6 py-3 bg-gray-50 rounded-2xl">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">24</p>
          <p className="text-xs text-gray-500">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">1.2k</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">890</p>
          <p className="text-xs text-gray-500">Following</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2">
          <UserPlus className="w-4 h-4" />
          <span>Follow</span>
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center">
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
