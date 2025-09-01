import { type EditPostProps } from "@/types";
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
  Edit,
  Type,
  FileText,
  Hash,
  Image as ImageIcon,
  Save,
  X,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

const EditPost = ({
  postId,
  initialData = {
    title: "My Amazing Blog Post",
    content:
      "This is the content of my blog post. It contains valuable insights and information that readers will find useful and engaging.",
    tags: "technology, react, webdev",
  },
}: EditPostProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Updating post...");
    setIsOpen(false);
  };

  const handleSaveDraft = () => {
    console.log("Saving as draft...");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-accent transition-all duration-200"
        >
          <Edit className="w-4 h-4" />
          Edit Post
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-card border border-border/50 shadow-2xl rounded-2xl p-0 overflow-hidden sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-gradient-to-r from-card to-accent/10 p-6 border-b border-border/50">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Edit Post
            </DialogTitle>
            <p className="text-muted-foreground mt-2">
              Update your post content and make it even better
            </p>
          </div>

          <div className="p-6 space-y-5">
            {/* Title Field */}
            <div className="space-y-2">
              <Label
                htmlFor="editTitle"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Type className="w-4 h-4" />
                Post Title
              </Label>
              <Input
                id="editTitle"
                name="title"
                placeholder="Enter an engaging title for your post..."
                defaultValue={initialData.title}
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                required
              />
            </div>

            {/* Content Field */}
            <div className="space-y-2">
              <Label
                htmlFor="editContent"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Content
              </Label>
              <Textarea
                id="editContent"
                name="content"
                placeholder="Write your post content here. Share your thoughts, experiences, or insights..."
                defaultValue={initialData.content}
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none min-h-[120px]"
                rows={8}
                required
              />
            </div>

            {/* Tags Field */}
            <div className="space-y-2">
              <Label
                htmlFor="editTags"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <Hash className="w-4 h-4" />
                Tags
              </Label>
              <Input
                id="editTags"
                name="tags"
                placeholder="e.g. technology, react, webdev (separate with commas)"
                defaultValue={initialData.tags}
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Update tags to help others discover your post
              </p>
            </div>

            {/* Current Image Display */}
            {initialData.image && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Current Featured Image
                </Label>
                <div className="relative">
                  <img
                    src={initialData.image}
                    alt="Current featured image"
                    className="w-full h-32 object-cover rounded-xl border border-border"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <p className="text-white text-sm">Click below to change</p>
                  </div>
                </div>
              </div>
            )}

            {/* Image Upload Field */}
            <div className="space-y-2">
              <Label
                htmlFor="editImage"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                {initialData.image ? "Update Featured Image" : "Featured Image"}
              </Label>
              <Input
                id="editImage"
                name="image"
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 border border-border rounded-xl bg-background/50 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer cursor-pointer transition-all duration-200"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {initialData.image
                  ? "Upload a new image to replace the current one (optional)"
                  : "Upload a cover image for your post (optional)"}
              </p>
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
              type="button"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium py-3 px-6 rounded-xl transition-all duration-200"
              onClick={handleSaveDraft}
            >
              <Save className="w-4 h-4 mr-2" />
              Save as Draft
            </Button>

            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Update Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
