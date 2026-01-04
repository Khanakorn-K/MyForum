export interface CreatePostRequestModel {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  authorId?: string;
  coverImage?: File | string;
  published?: boolean;
  categories?: string[];
  tags?: string[];
}
