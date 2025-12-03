import { useState, useEffect, useRef, useCallback } from "react";
import { PostListentity } from "../entity/PostListentity";
import { postListDataSource } from "../services/postListDataSource";
import useStoreTag from "@/store/useStoreTag";
import useStoreCategories from "@/store/useStoreCategories";

export const usePostList = () => {
  const [postList, setPostList] = useState<PostListentity[]>([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState<number>(0);
  const [take] = useState<number>(10);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { tag } = useStoreTag();
  const { category } = useStoreCategories();

  useEffect(() => {
    setPostList([]);
    setSkip(0);
    setHasMore(true);
  }, [tag, category]);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;

      setLoading(true);
      try {
        let response: PostListentity[] = [];

        if (tag && tag.slug) {
          response = await postListDataSource.fetchPostListByTag(
            tag.slug,
            skip,
            take
          );
        } else if (category && category.slug) {
          response = await postListDataSource.fetchPostListByCategory(
            category.slug,
            skip,
            take
          );
        } else {
          response = await postListDataSource.fetchPostList(skip, take);
        }

        if (response.length < take) {
          setHasMore(false);
        }

        setPostList((prev) => {
          if (skip === 0) return response;
          return [...prev, ...response];
        });
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [skip, tag, category, take]);

  const handleLoadMorePostLits = useCallback(() => {
    if (!loading && hasMore) {
      setSkip((prev) => prev + take);
    }
  }, [loading, hasMore, take]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading && hasMore) {
          handleLoadMorePostLits();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [handleLoadMorePostLits, loading, hasMore]);

  return { postList, loading, loadMoreRef, hasMore, tag, category };
};
