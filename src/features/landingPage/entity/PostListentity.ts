import { formatDate } from './../../../utils/date';
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { PostListResponseModel } from "../models/PostListResponseModel";

export class PostListentity {
  id: string | null;
  authorId: string | null;
  content: string | null;
  coverImage: string | null;
  createdAt: Timestamp | null;
  excerpt: string | null;
  published: boolean | null;
  publishedAt: Timestamp | null;
  slug: string[] | [null];
  title: string | null;
  updateAt: string | null;
  timestamp: number | null;

  constructor(postListResponseModel: PostListResponseModel) {
    this.id = postListResponseModel.id;
    this.authorId = postListResponseModel.authorId;
    this.content = postListResponseModel.content;
    this.coverImage = postListResponseModel.coverImage;
    this.createdAt = postListResponseModel.createdAt;
    this.excerpt = postListResponseModel.excerpt;
    this.published = postListResponseModel.published;
    this.publishedAt = postListResponseModel.publishedAt;
    this.slug = postListResponseModel.slug;
    this.title = postListResponseModel.title;
    this.updateAt = postListResponseModel.updateAt;
    this.timestamp = postListResponseModel.timestamp;
  }

  get displayDisplayCreateAt(): string {
    return  formatDate(this.createdAt as Timestamp);
  }
}
