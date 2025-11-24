import { formatDate } from './../../../utils/date';
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { PostListResponseModel } from "../models/PostListResponseModel";

export class PostListentity {
  id: string;
  authorId: string;
  content: string;
  coverImage: string;
  createdAt: string;
  excerpt: string;
  published: boolean;
  publishedAt: string;
  slug: string[] | [null];
  title: string;
  updateAt: string;
  timestamp: number;
  authorName: string;
  authorImage: string;

  constructor(postListResponseModel: PostListResponseModel) {
    this.id = postListResponseModel.id ?? "noPost Id";
    this.authorId = postListResponseModel.authorId ?? "noAuthor Id";
    this.content = postListResponseModel.content  ?? "no Content";
    this.coverImage = postListResponseModel.coverImage ?? "https://picsum.photos/200/300" ;
    this.createdAt = postListResponseModel.createdAt ?? "noDate";
    this.excerpt = postListResponseModel.excerpt ?? "noExcerpt";
    this.published = postListResponseModel.published ?? false;
    this.publishedAt = postListResponseModel.publishedAt ?? "no publishedAt" ;
    this.slug = postListResponseModel.slug ?? "no Slug";
    this.title = postListResponseModel.title ?? "no Title";
    this.updateAt = postListResponseModel.updateAt ?? "no Update";
    this.timestamp = postListResponseModel.timestamp ?? 0;
    this.authorName = postListResponseModel.author?.name ?? "no name"
    this.authorImage = postListResponseModel.author?.image ?? "author Image"
  }

  get displayDisplayCreateAt(): string {
    return  formatDate(this.createdAt);
  }
}
