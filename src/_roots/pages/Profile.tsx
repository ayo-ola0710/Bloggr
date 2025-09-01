import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreatePost from "@/components/form/CreatePost";
import EditProfile from "@/components/form/EditProfile";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Heart, BookOpen } from "lucide-react";

const Profile = () => {
  return (
    <main className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <Avatar className="profile-avatar-image w-30 h-30">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Israel Olatunle"
              />
              <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                IO
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">Israel Olatunle</h1>
            <p className="profile-bio">
              Passionate blogger and storyteller sharing insights about
              technology, life, and everything in between. Always learning,
              always growing.
            </p>

            {/* Profile Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined March 2024</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>

            {/* Tags/Interests */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary" className="text-xs">
                Technology
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Web Development
              </Badge>
              <Badge variant="secondary" className="text-xs">
                React
              </Badge>
              <Badge variant="secondary" className="text-xs">
                TypeScript
              </Badge>
            </div>
          </div>

          <div className="profile-actions">
            <EditProfile />
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats flex justify-between mx-30">
          <div className="profile-stat">
            <div className="profile-stat-value">
              <BookOpen className="w-5 h-5 inline mr-1" />
              42
            </div>
            <div className="profile-stat-label">Posts</div>
          </div>

          <div className="profile-stat">
            <div className="profile-stat-value">
              <Users className="w-5 h-5 inline mr-1" />
              1.2K
            </div>
            <div className="profile-stat-label">Followers</div>
          </div>

          <div className="profile-stat">
            <div className="profile-stat-value">
              <Users className="w-5 h-5 inline mr-1" />
              234
            </div>
            <div className="profile-stat-label">Following</div>
          </div>

          <div className="profile-stat">
            <div className="profile-stat-value">
              <Heart className="w-5 h-5 inline mr-1" />
              5.8K
            </div>
            <div className="profile-stat-label">Likes</div>
          </div>
        </div>
      </div>

      <CreatePost />
      {/* Recent Posts Section */}
      <div className="profile-content">
        <h2 className="profile-section-title">Recent Posts</h2>
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No posts yet</p>
          <p className="text-sm">Start sharing your thoughts with the world!</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
