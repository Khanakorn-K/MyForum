import { useState, useEffect, useRef, useCallback } from "react";
import { PostListentity } from "../entity/PostListentity";
import { postListDataSource } from "../services/postListDataSource";

export const usePostList = () => {
  const [postList, setPostList] = useState<PostListentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState<number>(0);
  const [take] = useState<number>(10);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMorePostLits = useCallback(() => {
    setSkip((prev) => prev + 10);
  }, []);

  useEffect(() => {
    if (postList.length > 0) return;

    const loadPostList = async () => {
      setLoading(true);
      const response = await postListDataSource.fetchPostList(0, take);
      setPostList(response);
      setLoading(false);
    };

    loadPostList();
  }, []);

  useEffect(() => {
    if (skip === 0) return;

    const load = async () => {
      setLoading(true);
      const response = await postListDataSource.fetchPostList(skip, take);
      setPostList((prev) => [...prev, ...response]);
      setLoading(false);
    };

    load();
  }, [skip, take]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading) {
        handleLoadMorePostLits();
      }
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [loading, handleLoadMorePostLits]);

  return { postList, loading, handleLoadMorePostLits, loadMoreRef };
};
