import { PostResponseModel } from "../models/PostResponseModel";

export class PostEntity {
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

  constructor(postResponseModel: PostResponseModel) {
    this.id = postResponseModel.id;
    this.authorId = postResponseModel.authorId;
    this.content = postResponseModel.content;
    this.coverImage = postResponseModel.coverImage;
    this.createdAt = postResponseModel.createdAt;
    this.excerpt = postResponseModel.excerpt;
    this.published = postResponseModel.published;
    this.publishedAt = postResponseModel.publishedAt;
    this.slug = postResponseModel.slug;
    this.title = postResponseModel.title;
    this.updatedAt = postResponseModel.updatedAt;
  }
}
