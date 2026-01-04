import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostEntity } from "../entity/PostEntity";
import { PostDataSource } from "../services/PostDataSource";

export const usePostDetail = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [post, setPost] = useState<PostEntity | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchPost = async () => {
            try {
                setLoading(true);
                const result = await PostDataSource.fetchPostOneById(id);
                setPost(result);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    return {
        post,
        loading,
        id,
    };
};
