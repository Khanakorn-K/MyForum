import { useState, useEffect, useRef } from "react";
import { PostListentity } from "../entity/PostListentity";
import { postListDataSource } from "../services/postListDataSource";

export const usePostList = () => {
  const [postList, setPostList] = useState<PostListentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const response = await postListDataSource.fetchPostList(skip, take);
    setPostList((prev) => [...prev, ...response]);
    setLoading(false);
  };

  const fetchLoadingMorePostLits = async () => {
    setSkip((prev) => prev + 10);
  };

  useEffect(() => {
    const load = async () => {
      await fetchData();
    };
    load();
  }, [skip]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading) {
        fetchLoadingMorePostLits();
      }
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [loading, fetchLoadingMorePostLits]);

  return { postList, loading, fetchLoadingMorePostLits, loadMoreRef };
};
