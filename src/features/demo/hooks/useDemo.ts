import { useState, useEffect } from "react";
import { DemoDataEntity } from "../entity/DemoData";
import { demoService } from "../services/api";

export const useDemo = () => {
  const [data, setData] = useState<DemoDataEntity[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await demoService.fetchDataAll();
    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchData();
    };
    fetch();
  }, []);

  return { data, loading };
};
