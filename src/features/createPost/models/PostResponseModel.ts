export interface PostResponseModel {
  success: boolean;
  data: PostResponseResultModel;
}

export interface PostResponseResultModel {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  publishedAt: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  tags: Category[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
