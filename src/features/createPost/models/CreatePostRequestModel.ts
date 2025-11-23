export interface CreatePostRequestModel {
    title: string;
    excerpt?: string;
    content: string;
    coverImage?: File;
    published?: boolean;
    categories?: string[];
    tags?: string[];
}
