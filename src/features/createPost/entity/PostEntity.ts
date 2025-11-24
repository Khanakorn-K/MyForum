import {
  Category,
  PostResponseResultModel,
} from "../models/PostResponseModel";

export class PostEntity {
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

  constructor(entity: PostResponseResultModel) {
    this.id = entity.id ?? "";
    this.title = entity.title ?? "";
    this.slug = entity.slug ?? "";
    this.excerpt = entity.excerpt ?? "";
    this.content = entity.content ?? "";
    this.coverImage = entity.coverImage ?? "";
    this.published = entity.published ?? false;
    this.publishedAt = entity.publishedAt ?? "";
    this.authorId = entity.authorId ?? "";
    this.createdAt = entity.createdAt ?? "";
    this.updatedAt = entity.updatedAt ?? "";
    this.categories = entity.categories ?? "";
    this.tags = entity.tags ?? "";
  }
}
