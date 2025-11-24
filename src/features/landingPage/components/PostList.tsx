"use client";
import CardPost from "./CardPost";
import { usePostList } from "../hooks/usePostList";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const PostList = () => {
  const { postList, loading, loadMoreRef } = usePostList();

  return (
    <div className="flex flex-col gap-6">
      {postList?.map((post, index) => (
        <CardPost
          key={index}
          content={post.content}
          slug={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          displayDisplayCreateAt={post.displayDisplayCreateAt}
        />
      ))}

      {loading ?? <Spinner />}
      {postList.length ?? <div ref={loadMoreRef} className="h-8" />}
    </div>
  );
};

export default PostList;
