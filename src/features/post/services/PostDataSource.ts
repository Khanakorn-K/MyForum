import { PostRequestModel } from "../models/PostRequestModel";
import { apiClient } from "../../../lib/api-client";
import { ApiResponse } from "../../../types/api";
import { PostResponseModel } from "../models/PostResponseModel";
import { PostEntity } from "../entity/PostEntity";

export const PostDataSource = {
  fetchPostOneById: async (id: string): Promise<PostEntity> => {
    const response = await apiClient.get<ApiResponse<PostResponseModel>>(
      "/post",
      { params: { id: id } }
    );
    const result = response.data;
    return new PostEntity(result);
  },
};
