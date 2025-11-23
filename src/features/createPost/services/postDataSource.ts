import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@/types/api';
import { PostResponseModel } from '../models/PostResponseModel';
import { CreatePostRequestModel } from '../models/CreatePostRequestModel';
import { PostEntity } from '../entity/PostEntity';

export const postService = {
    createPost: async (data: CreatePostRequestModel): Promise<PostEntity> => {
        const response = await apiClient.post<ApiResponse<PostResponseModel>>('/post', data);
        return new PostEntity(response.data);
    },

    fetchAllPosts: async (): Promise<PostEntity[]> => {
        const response = await apiClient.get<ApiResponse<PostResponseModel[]>>('/post');
        return response.data.map(item => new PostEntity(item));
    },

    fetchPostById: async (id: string): Promise<PostEntity> => {
        const response = await apiClient.get<ApiResponse<PostResponseModel>>(`/post/${id}`);
        return new PostEntity(response.data);
    },

    updatePost: async (id: string, data: CreatePostRequestModel): Promise<PostEntity> => {
        const response = await apiClient.put<ApiResponse<PostResponseModel>>(`/post/${id}`, data);
        return new PostEntity(response.data);
    },

    deletePost: (id: string) => {
        return apiClient.delete<ApiResponse<void>>(`/post/${id}`);
    },
};
