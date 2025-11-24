import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api";
import {
  PostResponseModel,
  PostResponseResultModel,
} from "../models/PostResponseModel";
import { CreatePostRequestModel } from "../models/CreatePostRequestModel";
import { PostEntity } from "../entity/PostEntity";
import { CreatePostResponseModel } from "../models/CreatePostResponseModel";
import { PostListResponseModel } from "@/features/landingPage/models/PostListResponseModel";

export const createPostDataSource = {
  createPost: async (
    data: CreatePostRequestModel
  ): Promise<CreatePostResponseModel> => {
    const response = await apiClient.post<ApiResponse<CreatePostResponseModel>>(
      "/post/create",
      data
    );
    if (!response.success) {
      throw new Error(response.message || "Failed to create post");
    }
    return response.data;
  },
  updatePost: async (
    data: CreatePostRequestModel,
    id: string
  ): Promise<CreatePostResponseModel> => {
    const response = await apiClient.put<ApiResponse<CreatePostResponseModel>>(
      "/post/create",
      data,
      { params: { id: id } }
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to update post");
    }
    return response.data;
  },
  getPostById: async (id: string): Promise<PostEntity> => {
    const response = await apiClient.get<ApiResponse<PostResponseResultModel>>(
      "/post",
      { params: { id: id } }
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to get post");
    }
    return new PostEntity(response.data);
  },
  deletePost: (id: string) => {
    return apiClient.delete<ApiResponse<void>>(`/post/${id}`);
  },
};
