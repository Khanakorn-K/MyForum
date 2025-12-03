import { CategoriesEntity } from "@/entity/CategoriesEntity";
import { TagsEntity } from "@/entity/TagsEntity";
import { apiClient } from "@/lib/api-client";
import { CategoriesResponseModel } from "@/model/CategoriesResponseModel";
import { TagsResponseModel } from "@/model/TagsResponseModel";
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
  fetchAllCategories: async (): Promise<CategoriesEntity[]> => {
    const response = await apiClient.get<TagsResponseModel>("/getCategories");

    if (!response.success) {
      throw new Error("Failed to fetch data");
    }

    const result = response.data;
    return result.map((item) => new CategoriesEntity(item));
  },
};
