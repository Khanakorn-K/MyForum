import { TagsEntity } from "@/entity/TagsEntity";
import { apiClient } from "@/lib/api-client";
import { TagsResponseModel } from "@/modelGlobal/TagsResponseModel";
import { ApiResponse } from "@/types/api";

export const globalDataSource = {
  // สำรหับเรียกหา Tags ทุกตัวในระบบ

  fetchAllTags: async (): Promise<TagsEntity[]> => {
    const response = await apiClient.get<TagsResponseModel>("/getTags");

    if (!response.success) {
      throw new Error("Failed to fetch data");
    }

    const result = response.data;
    return result.map((item) => new TagsEntity(item));
  },
};
