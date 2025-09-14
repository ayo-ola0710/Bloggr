import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import useAuth from "@/hooks/useAuth";
import type { SavedPost } from "@/types/index";

interface SavedPostsContextType {
  savedPosts: SavedPost[];
  isPostSaved: (postId: string) => boolean;
  toggleSavePost: (postId: string) => Promise<void>;
  loading: boolean;
}

const SavedPostsContext = createContext<SavedPostsContextType | undefined>(
  undefined
);

export const SavedPostsProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchSavedPosts();
    } else {
      setSavedPosts([]);
      setLoading(false);
    }
  }, [currentUser]);

  const fetchSavedPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/saved?userId=${currentUser?.id}`
      );
      if (!response.ok) throw new Error("Failed to fetch saved posts");
      const data = await response.json();
      setSavedPosts(data);
    } catch (error) {
      console.error("Error fetching saved posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const isPostSaved = (postId: string) => {
    return savedPosts.some((savedPost) => savedPost.postId === postId);
  };

  const toggleSavePost = async (postId: string) => {
    if (!currentUser) return;

    try {
      const isCurrentlySaved = isPostSaved(postId);

      if (isCurrentlySaved) {
        // Find the saved post to get its ID
        const savedPost = savedPosts.find((sp) => sp.postId === postId);
        if (savedPost) {
          await fetch(`http://localhost:8000/saved/${savedPost.id}`, {
            method: "DELETE",
          });
          setSavedPosts(savedPosts.filter((sp) => sp.postId !== postId));
        }
      } else {
        const response = await fetch("http://localhost:8000/saved", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId,
            userId: currentUser.id,
            createdAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) throw new Error("Failed to save post");

        const newSavedPost = await response.json();
        setSavedPosts([...savedPosts, newSavedPost]);
      }
    } catch (error) {
      console.error("Error toggling save post:", error);
    }
  };

  return (
    <SavedPostsContext.Provider
      value={{ savedPosts, isPostSaved, toggleSavePost, loading }}
    >
      {children}
    </SavedPostsContext.Provider>
  );
};

export const useSavedPosts = () => {
  const context = useContext(SavedPostsContext);
  if (context === undefined) {
    throw new Error("useSavedPosts must be used within a SavedPostsProvider");
  }
  return context;
};
