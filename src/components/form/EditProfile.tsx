import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import {
  Edit,
  User,
  AtSign,
  FileText,
  Camera,
  Save,
  X,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Saving profile changes...");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-card border border-border/50 shadow-2xl rounded-2xl p-0 overflow-hidden sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-gradient-to-r from-card to-accent/10 p-6 border-b border-border/50">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Edit Profile
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Update your profile information and make it shine
            </DialogDescription>
          </div>

          <div className="p-6 space-y-5">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <Avatar className="w-24 h-24 border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                  />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                    IO
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Click to change profile picture
              </p>
            </div>

            {/* Profile Picture Upload */}
            <div className="space-y-2">
              <Label
                htmlFor="profilePic"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Profile Picture
              </Label>
              <Input
                id="profilePic"
                name="profilePic"
                type="file"
                accept="image/*"
                className="w-full px-4  h-20 py-3 border border-border rounded-xl bg-background/50 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer cursor-pointer transition-all duration-200"
              />
            </div>

            {/* Full Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                defaultValue="Israel Olatunle"
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                required
              />
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <AtSign className="w-4 h-4" />
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Choose a unique username"
                defaultValue="israelolatunle"
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                required
              />
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <Label
                htmlFor="bio"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself, your interests, and what you love to write about..."
                defaultValue="Passionate blogger and storyteller sharing insights about technology, life, and everything in between. Always learning, always growing."
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none min-h-[100px]"
                rows={4}
              />
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="Where are you based?"
                defaultValue="Lagos, Nigeria"
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              />
            </div>
          </div>

          <div className="bg-muted/30 p-6 border-t border-border/50 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                className="border border-border bg-background hover:bg-accent text-foreground font-medium py-3 px-6 rounded-xl transition-all duration-200"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
