
export interface PostResponseModel {
  id: string;
  authorId: string;
  content: string;
  coverImage: string | null;
  createdAt: string;
  excerpt: string | null;
  published: boolean;
  publishedAt: string | null;
  slug: string; 
  title: string;
  updatedAt: string;
}
