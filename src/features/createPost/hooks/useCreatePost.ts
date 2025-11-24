import { useState, useEffect } from "react";
import { createPostDataSource } from "../services/createPostDataSource";
import { CreatePostRequestModel } from "../models/CreatePostRequestModel";
import { PostEntity } from "../entity/PostEntity";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadFile } from "@/utils/supabase";

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostEntity | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const [formData, setFormData] = useState<CreatePostRequestModel>({
    title: "",
    excerpt: "",
    content: "",
    coverImage: undefined,
    published: false,
    categories: [],
    tags: [],
  });

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;

      setIsLoading(true);
      try {
        const result = await createPostDataSource.getPostById(postId);
        if (result) {
          setFormData({
            title: result.title || "",
            excerpt: result.excerpt || "",
            content: result.content || "",
            coverImage: result.coverImage || undefined,
            published: result.published || false,
            categories:
              result.categories?.map((c: { name: string }) => c.name) || [],
            tags: result.tags?.map((t: { name: string }) => t.name) || [],
          });
        }
      } catch (err) {
        console.error("Failed to fetch post for edit:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await savePost(formData);
    } catch (err) {
      console.error("Failed to save post:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTagsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setFormData((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  const handleCategoriesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const categoriesArray = value
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat.length > 0);
    setFormData((prev) => ({
      ...prev,
      categories: categoriesArray,
    }));
  };

  const removeTag = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, index) => index !== indexToRemove) || [],
    }));
  };

  const removeCategory = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      categories:
        prev.categories?.filter((_, index) => index !== indexToRemove) || [],
    }));
  };

  const savePost = async (data: CreatePostRequestModel) => {
    setIsLoading(true);
    setError(null);

    try {
      if (data.coverImage instanceof File) {
        const savedImage = await uploadFile(data.coverImage);
        data.coverImage = savedImage;
      }

      let result;

      if (postId) {
        result = await createPostDataSource.updatePost(data, postId);
      } else {
        result = await createPostDataSource.createPost(data);
      }

      router.push(`/post?id=${result.id}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save post";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    post,
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    handleTagsInput,
    handleCategoriesInput,
    removeTag,
    removeCategory,
    router,
    postId,
  };
};
