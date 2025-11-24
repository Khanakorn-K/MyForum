"use client";
import CardPost from "./CardPost";
import { usePostList } from "../hooks/usePostList";

const PostList = () => {
  const { postList, loading, loadMoreRef } = usePostList();

  return (
    <div className="flex flex-col gap-6 items-center">
      {postList?.map((post, index) => (
        <CardPost
          key={index}
          id={post.id}
          content={post.content}
          slug={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          displayDisplayCreateAt={post.displayDisplayCreateAt}
          authorImage={post.authorImage}
          authorName={post.authorName}
        />
      ))}

      {/* <div ref={loadMoreRef} className="h-8" /> */}
    </div>
  );
};

export default PostList;
