import { apiClient } from "../../../lib/api-client";
import { ApiResponse } from "../../../types/api";
import { PostListentity } from "../entity/PostListentity";
import { PostListResponseModel } from "../models/PostListResponseModel";

export const postListDataSource = {
  fetchPostList: async (
    skip: number,
    take: number
  ): Promise<PostListentity[]> => {
    const response = await apiClient.get<ApiResponse<PostListResponseModel[]>>(
      "/post",
      {
        params: {
          skip: skip.toString(),
          take: take.toString(),
        },
      }
    );
    return response.data.map((item) => new PostListentity(item));
  },


  detchDelete: (id: string) => {
    return apiClient.delete<ApiResponse<void>>(`/demo/${id}`);
  },
};
