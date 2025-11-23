
import { apiClient } from '../../../lib/api-client';
import { ApiResponse } from '../../../types/api';
import { PostListentity } from '../entity/PostListentity';
import { PostListResponseModel } from '../models/PostListResponseModel';

export const postListDataSource = {
  fetchPostList: async (skip:number,take:number): Promise<PostListentity[]> => {
    const response = await apiClient.get<ApiResponse<PostListResponseModel[]>>('/post',skip,take);
    return response.data.map(item => new PostListentity(item));
  },

  fetchOneById: async (id: string): Promise<PostListentity> => {
    const response = await apiClient.get<ApiResponse<PostListResponseModel>>(`/post/${id}`);
    return new PostListentity(response.data);
  },

  detchDelete: (id: string) => {
    return apiClient.delete<ApiResponse<void>>(`/demo/${id}`);
  },
};
