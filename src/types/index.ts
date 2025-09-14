export interface EditPostProps {
  postId?: string;
  initialData?: {
    title: string;
    content: string;
    tags: string;
    image?: string;
  };
}

export interface UserCardProps {
  id: string;
  intials: string;
  username: string;
  bio: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  email: string;
  password: string;
  location?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  users: User[];
  loading: boolean;
  error: string;
}

export interface SavedPost {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
  image?: string;
  createdAt: string;
  updatedAt?: string;
}

export type BlogCardProps = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  tags?: string[];
  image?: string;
};

export interface PostAuth {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
  image?: string;
  createdAt: string;
  authorName?: string;
}
