import { PostResponseModel } from "../models/PostResponseModel";

export class PostEntity {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImage?: string;
    published: boolean;
    publishedAt?: Date;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(postResponseModel: PostResponseModel) {
        this.id = postResponseModel.id;
        this.title = postResponseModel.title;
        this.slug = postResponseModel.slug;
        this.excerpt = postResponseModel.excerpt;
        this.content = postResponseModel.content;
        this.coverImage = postResponseModel.coverImage;
        this.published = postResponseModel.published;
        this.publishedAt = postResponseModel.publishedAt
            ? new Date(postResponseModel.publishedAt)
            : undefined;
        this.authorId = postResponseModel.authorId;
        this.createdAt = new Date(postResponseModel.createdAt);
        this.updatedAt = new Date(postResponseModel.updatedAt);
    }
}
