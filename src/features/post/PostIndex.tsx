"use client";
import React from "react";
import { usePostDetail } from "./hooks/usePostDetail";
import Image from "next/image";
import { formatDate } from "@/utils/date";
import Comment from "./components/Comment";

const PostIndex = () => {
  const { post, loading } = usePostDetail();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        {loading && (
          <div className="flex flex-1 items-center justify-center py-20 text-sm text-slate-400">
            กำลังโหลดโพสต์...
          </div>
        )}

        {!loading && !post && (
          <div className="flex flex-1 items-center justify-center py-20 text-sm text-slate-500">
            ไม่พบโพสต์ที่คุณต้องการ
          </div>
        )}

        {!loading && post && (
          <>
            {/* ส่วนเนื้อหา Post */}
            <article className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
              <header className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  บทความ
                </p>
                <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-50">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span>{formatDate(post.createdAt)}</span>
                  <span
                    className={`h-1 w-1 rounded-full ${post.published ? "bg-green-600" : "bg-slate-600"
                      }`}
                  />
                  <span>
                    เผยแพร่แล้ว: {post.published ? "ใช่" : "ยังไม่เผยแพร่"}
                  </span>
                </div>
              </header>

              {post.coverImage && (
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                  <Image
                    width={800}
                    height={800}
                    src={post.coverImage}
                    alt={post.title}
                    className="h-80 w-full object-cover transition duration-500 ease-out hover:scale-105"
                  />
                </div>
              )}

              {post.excerpt && (
                <p className="text-base leading-relaxed text-slate-200">
                  {post.excerpt}
                </p>
              )}

              <section
                className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-100"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* 2. ส่วน Comment ต่อท้าย */}
            <div className="mt-8 border-t border-slate-800 pt-8">
              <Comment postId={post.id} />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default PostIndex;
