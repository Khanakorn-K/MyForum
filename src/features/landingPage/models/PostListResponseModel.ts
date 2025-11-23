import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface PostListResponseModel {
  id: string;
  authorId: string;
  content: string;
  coverImage: string | null;
  createdAt: Timestamp;
  excerpt: string;
  published: boolean;
  publishedAt: Timestamp;
  slug: string[] | [null];
  title: string;
  updateAt: string;
  message: string;
  timestamp: number;
}
