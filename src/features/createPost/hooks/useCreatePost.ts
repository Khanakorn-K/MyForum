import { useState, useEffect, useMemo } from "react";
import { createPostDataSource } from "../services/createPostDataSource";
import { CreatePostRequestModel } from "../models/CreatePostRequestModel";
import { PostEntity } from "../entity/PostEntity";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { useSession } from "next-auth/react";

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostEntity | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const session = useSession();

  const [formData, setFormData] = useState<CreatePostRequestModel>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    authorId: "",
    coverImage: undefined,
    published: false,
    categories: [],
    tags: [],
  });

  // Local UI state
  const [manualCategory, setManualCategory] = useState("");
  const [manualTag, setManualTag] = useState("");

  useEffect(() => {
    if (!postId && session.data?.user?.id) {
      setFormData((prev) => {
        if (prev.authorId !== session.data.user.id) {
          return { ...prev, authorId: session.data.user.id };
        }
        return prev;
      });
    }
  }, [session.data, postId]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;

      setIsLoading(true);
      try {
        const result = await createPostDataSource.getPostById(postId);

        if (result) {
          if (session.status === "authenticated" && result.authorId !== session.data?.user?.id) {
            router.push("/");
            return;
          }

          setFormData({
            id: result.id || "",
            title: result.title || "",
            excerpt: result.excerpt || "",
            content: result.content || "",
            authorId: result.authorId || "",
            coverImage: result.coverImage || undefined,
            published: result.published || false,
            categories: result.categories?.map((c: { name: string }) => c.name) || [],
            tags: result.tags?.map((t: { name: string }) => t.name) || [],
          });
          setPost(result);
        }
      } catch (err) {
        setError("Failed to load post data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (session.status !== "loading") {
      fetchPostData();
    }
  }, [postId, session.status, session.data, router]);

  // Logic สำหรับสร้าง URL Preview
  const previewUrl = useMemo(() => {
    if (!formData.coverImage) return null;

    // กรณี 1: เป็น URL String (โหลดมาจาก DB)
    if (typeof formData.coverImage === "string") {
      return formData.coverImage;
    }

    // กรณี 2: เป็น File Object (เพิ่งเลือกไฟล์ใหม่)
    if (formData.coverImage instanceof File) {
      return URL.createObjectURL(formData.coverImage);
    }

    return null;
  }, [formData.coverImage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await savePost(formData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (!formData.tags?.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), trimmed],
      }));
    }
  };

  const removeTag = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, index) => index !== indexToRemove) || [],
    }));
  };

  const addCategory = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (!formData.categories?.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...(prev.categories || []), trimmed],
      }));
    }
  };

  const removeCategory = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories?.filter((_, index) => index !== indexToRemove) || [],
    }));
  };

  const savePost = async (data: CreatePostRequestModel) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!data.authorId && session.data?.user?.id) {
        data.authorId = session.data.user.id;
      }

      if (data.coverImage instanceof File) {
        const savedImage = await uploadFile(data.coverImage);
        data.coverImage = savedImage;
      }

      if (postId) {
        const result = await createPostDataSource.updatePost(data, postId);
        router.push(`/post?id=${result.id}`);
      } else {
        const result = await createPostDataSource.createPost(data);
        router.push(`/post?id=${result.id}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save post";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualCategoryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCategory(manualCategory);
      setManualCategory("");
    }
  };

  const handleManualTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(manualTag);
      setManualTag("");
    }
  };

  const handleAddCategoryClick = () => {
    addCategory(manualCategory);
    setManualCategory("");
  };

  const handleAddTagClick = () => {
    addTag(manualTag);
    setManualTag("");
  };

  const handleRemovePreviewImage = () => {
    setFormData((prev) => ({
      ...prev,
      coverImage: "",
    }));
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    addCategory(e.target.value);
    e.target.value = "";
  };

  const handleSelectTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    addTag(e.target.value);
    e.target.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      coverImage: e.target.files?.[0],
    });
  }

  const handleContentChange = (html: string) => {
    setFormData((prev) => ({ ...prev, content: html }));
  }


  return {
    isLoading,
    error,
    post,
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    addTag,
    removeTag,
    addCategory,
    removeCategory,
    router,
    postId,
    // New exports
    manualCategory,
    setManualCategory,
    manualTag,
    setManualTag,
    previewUrl,
    handleManualCategoryKeyDown,
    handleManualTagKeyDown,
    handleAddCategoryClick,
    handleAddTagClick,
    handleRemovePreviewImage,
    handleSelectCategory,
    handleSelectTag,
    handleFileChange,
    handleContentChange,
  };
};