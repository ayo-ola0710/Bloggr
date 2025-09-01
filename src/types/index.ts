export interface EditPostProps {
  postId?: string;
  initialData?: {
    title: string;
    content: string;
    tags: string;
    image?: string;
  };
}
