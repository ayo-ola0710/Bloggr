import { PostContext } from "@/context/PostContext";
import { useContext } from "react";

const usePost = () => {
  const context = useContext(PostContext);
  if (context === null) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};

export default usePost;
