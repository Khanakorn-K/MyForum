"use client";
import CardPost from "./CardPost";
import { usePostList } from "../hooks/usePostList";
import useStoreTag from "@/store/useStoreTag";

const PostList = () => {
  const { postList, loading, loadMoreRef, hasMore } = usePostList();
  const { tag } = useStoreTag();

  if (!loading && postList.length === 0) {
    if (tag && tag.slug) {
      return <h1>ไม่มีรายการโพสต์ สำหรับ {tag.name}</h1>;
    }
    return <h1>ไม่มีรายการโพสต์</h1>;
  }

  return (
    <div className="flex flex-col gap-6 items-center pb-10">
      {postList?.map((post) => (
        <CardPost
          key={post.id}
          id={post.id}
          content={post.content}
          slug={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          displayDisplayCreateAt={post.displayDisplayCreateAt}
          authorImage={post.authorImage}
          authorName={post.authorName}
          categories={post.categories}
          tags={post.tags}
        />
      ))}

      {hasMore && (
        <div
          ref={loadMoreRef}
          className="h-10 w-full flex justify-center items-center"
        >
          {loading && <span>Loading...</span>}
        </div>
      )}
    </div>
  );
};

export default PostList;
