import { useState } from 'react';
import { postService } from '../services/postDataSource';
import { CreatePostRequestModel } from '../models/CreatePostRequestModel';
import { PostEntity } from '../entity/PostEntity';

export const useCreatePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [post, setPost] = useState<PostEntity | null>(null);

    const createPost = async (data: CreatePostRequestModel) => {
        setIsLoading(true);
        setError(null);

        try {
            const newPost = await postService.createPost(data);
            setPost(newPost);
            return newPost;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createPost,
        isLoading,
        error,
        post,
    };
};
