export interface EditPostProps {
  postId?: string;
  initialData?: {
    title: string;
    content: string;
    tags: string;
    image?: string;
  };
}

export interface BlogCardProps {
  inital: string;
  name: string;
  time: number;
  topic: string;
  writeup: string;
}

export interface TrendingBlog {
  id: number;
  title: string;
  description: string;
  author: string;
  readTime: string;
  views: number;
  comments: number;
  category: string;
}

export interface UserCardProps {
  intials: string;
  username: string;
  bio: string;
}
