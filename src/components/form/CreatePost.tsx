import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import {
  Plus,
  Type,
  FileText,
  Hash,
  Image as ImageIcon,
  Save,
  Send,
} from "lucide-react";
import { useState } from "react";

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Publishing post...");
    setIsOpen(false);
  };

  const handleSaveDraft = () => {
    console.log("Saving as draft...");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Post
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-card border border-border/50 shadow-2xl rounded-2xl p-0 overflow-hidden sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-gradient-to-r from-card to-accent/10 p-6 border-b border-border/50">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Create New Post
            </DialogTitle>
            <p className="text-muted-foreground mt-2">
              Share your thoughts and ideas with the world
            </p>
          </div>

          <div className="p-6 space-y-5">
            {/* Title Field */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Type className="w-4 h-4" />
                Post Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter an engaging title for your post..."
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                required
              />
            </div>

            {/* Content Field */}
            <div className="space-y-2">
              <Label
                htmlFor="content"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your post content here. Share your thoughts, experiences, or insights..."
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none min-h-[120px]"
                rows={8}
                required
              />
            </div>

            {/* Tags Field */}
            <div className="space-y-2">
              <Label
                htmlFor="tags"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Hash className="w-4 h-4" />
                Tags
              </Label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g. technology, react, webdev (separate with commas)"
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Add relevant tags to help others discover your post
              </p>
            </div>

            {/* Image Upload Field */}
            <div className="space-y-2">
              <Label
                htmlFor="image"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Featured Image
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 h-20 border border-border rounded-xl bg-background/50 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer cursor-pointer transition-all duration-200"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Upload a cover image for your post (optional)
              </p>
            </div>
          </div>

          <div className="bg-muted/30 p-6 border-t border-border/50 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                className="border border-border bg-background hover:bg-accent text-foreground font-medium py-3 px-6 rounded-xl transition-all duration-200"
                onClick={handleSaveDraft}
              >
                <Save className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <Send className="w-4 h-4 mr-2" />
              Publish Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
