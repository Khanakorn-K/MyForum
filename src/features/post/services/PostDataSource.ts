import { PostRequestModel } from "../models/PostRequestModel";
import { apiClient } from "../../../lib/api-client";
import { ApiResponse } from "../../../types/api";
import { PostResponseModel } from "../models/PostResponseModel";
import { PostEntity } from "../entity/PostEntity";

export const PostDataSource = {
  fetchPostOneById: async (id: PostRequestModel | unknown): Promise<PostEntity> => {
    const response = await apiClient.post<ApiResponse<PostResponseModel>>(
      "/post",
      {id}
    );
    const result = response.data;
    console.log("resultresult",result)
    return new PostEntity(result);
  },
};
