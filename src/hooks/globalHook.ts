import { CategoriesEntity } from "@/entity/CategoriesEntity";
import { TagsEntity } from "@/entity/TagsEntity";
import { CategoriesResponseModel } from "@/model/CategoriesResponseModel";
import { TagsResponseResultModel } from "@/model/TagsResponseModel";
import { globalDataSource } from "@/services/globalDataSource";
import useStoreTag from "@/store/useStoreTag";
import { useEffect, useState } from "react";

export const useGlobal = () => {
  const [tags, setTags] = useState<TagsEntity[]>([]);
  const [category, setCategories] = useState<CategoriesEntity[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await globalDataSource.fetchAllTags();
        setTags(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await globalDataSource.fetchAllCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return { tags, category };
};
