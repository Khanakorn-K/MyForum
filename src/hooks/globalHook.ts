
import { TagsResponseResultModel } from "@/modelGlobal/TagsResponseModel";
import { globalDataSource } from "@/services/globalDataSource";
import { useEffect, useState } from "react";

export const useGlobal = () => {
  const [tags, setTags] = useState<TagsResponseResultModel[]>([]);

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

  return { tags };
};
