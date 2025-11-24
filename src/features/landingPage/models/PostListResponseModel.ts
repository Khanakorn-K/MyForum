
export interface PostListResponseModel {
  id: string | null;
  authorId: string | null;
  content: string | null;
  coverImage: string | null;
  createdAt: string | null;
  excerpt: string | null;
  published: boolean | false;
  publishedAt: string | null;
  slug: string[] | [null];
  title: string | null;
  updateAt: string | null;
  message: string | null;
  timestamp: number | null;
  author?: {
    name: string | null;
    image: string | null;
  } | null;
}
