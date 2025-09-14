import { createContext, useReducer, useEffect, type ReactNode } from "react";
import type { Post } from "@/types/index";

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string;
}

interface PostContextValue extends PostState {
  fetchPosts: () => Promise<void>;
  addPost: (
    post: Omit<Post, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  editPost: (postId: string, updatedPost: Partial<Post>) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: "",
};

const BASE_URL = "http://localhost:8000";

type Action =
  | { type: "loading" }
  | { type: "posts/fetched"; payload: Post[] }
  | { type: "post/added"; payload: Post }
  | { type: "post/edited"; payload: Post }
  | { type: "post/deleted"; payload: string }
  | { type: "error"; payload: string };

function reducer(state: PostState, action: Action): PostState {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: "" };
    case "posts/fetched":
      return { ...state, posts: action.payload, loading: false, error: "" };
    case "post/added":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
        error: "",
      };
    case "post/edited":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? { ...post, ...action.payload } : post
        ),
        loading: false,
        error: "",
      };
    case "post/deleted":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        loading: false,
        error: "",
      };
    case "error":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const PostContext = createContext<PostContextValue | null>(null);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPosts = async () => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      if (!response.ok)
        throw new Error(`Failed to fetch posts: ${response.status}`);
      const data = await response.json();
      dispatch({ type: "posts/fetched", payload: data });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: "error", payload: message });
    }
  };

  const addPost = async (
    post: Omit<Post, "id" | "createdAt" | "updatedAt">
  ) => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, createdAt: new Date().toISOString() }),
      });
      if (!response.ok)
        throw new Error(`Failed to add post: ${response.status}`);
      const data = await response.json();
      dispatch({ type: "post/added", payload: data });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: "error", payload: message });
    }
  };

  const editPost = async (postId: string, updatedPost: Partial<Post>) => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedPost,
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok)
        throw new Error(`Failed to edit post: ${response.status}`);
      const data: Post = await response.json();
      dispatch({ type: "post/edited", payload: data });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: "error", payload: message });
    }
  };

  const deletePost = async (postId: string) => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(`Failed to delete post: ${response.status}`);
      dispatch({ type: "post/deleted", payload: postId });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: "error", payload: message });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        loading: state.loading,
        error: state.error,
        fetchPosts,
        addPost,
        editPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext };
