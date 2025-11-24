export interface CreatePostRequestModel {
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: File | string;
  published?: boolean;
  categories?: string[];
  tags?: string[];
}
