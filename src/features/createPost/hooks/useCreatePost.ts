import { useState } from "react";
import { postService } from "../services/postDataSource";
import { CreatePostRequestModel } from "../models/CreatePostRequestModel";
import { PostEntity } from "../entity/PostEntity";
import { useRouter } from "next/navigation";

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostEntity | null>(null);

  const router = useRouter();

  const [formData, setFormData] = useState<CreatePostRequestModel>({
    title: "",
    excerpt: "",
    content: "",
    coverImage: undefined,
    published: false,
    categories: [],
    tags: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newPost = await fetchcreatePost(formData);
      router.push(`/posts/${newPost.id}`);
    } catch (err) {
      console.error("Failed to create post:", err);
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
  
  //call api layer
  const fetchcreatePost = async (data: CreatePostRequestModel) => {
    setIsLoading(true);
    setError(null);

    try {
      const newPost = await postService.createPost(data);
      setPost(newPost);
      return newPost;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create post";
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
  };
};
