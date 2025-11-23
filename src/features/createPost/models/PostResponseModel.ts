export interface PostResponseModel {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImage?: string;
    published: boolean;
    publishedAt?: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}
