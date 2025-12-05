import { CategoriesEntity } from "@/entity/CategoriesEntity";
import { TagsEntity } from "@/entity/TagsEntity";
import { globalDataSource } from "@/services/globalDataSource";
import { useEffect, useState, useCallback } from "react";

export const useGlobal = () => {
  const [tags, setTags] = useState<TagsEntity[]>([]);
  const [category, setCategories] = useState<CategoriesEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllTags = useCallback(async () => {
    try {
      const response = await globalDataSource.fetchAllTags();
      setTags(response);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }, []);

  const fetchAllCategories = useCallback(async () => {
    try {
      const response = await globalDataSource.fetchAllCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      await Promise.all([fetchAllTags(), fetchAllCategories()]);
      setIsLoading(false);
    };
    initData();
  }, [fetchAllTags, fetchAllCategories]);

  return {
    tags,
    category,
    isLoading,
  };
};
