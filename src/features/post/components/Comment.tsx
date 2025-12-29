"use client";

import React from "react";
import { User, Send, MessageSquare, Loader2, Trash2 } from "lucide-react";
import { useComment } from "../hooks/useComment";
import { Button } from "@/components/ui/Button";

const Comment = ({ postId }: { postId: string }) => {
  const {
    comments,
    content,
    setContent,
    isLoading,
    isSubmitting,
    handleSubmit,
    handleDelete,
    session,
  } = useComment({ postId });

  if (!session) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-card rounded-xl border border-border shadow-sm text-center">
        <p className="text-muted-foreground">
          กรุณาเข้าสู่ระบบเพื่อแสดงความคิดเห็น
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-card rounded-xl border border-border shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-xl font-semibold">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h2>ความคิดเห็น ({comments.length})</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            {/* แสดงชื่อผู้ใช้จาก Session */}
            <div className="flex items-center gap-2 px-1">
              <span className="text-sm font-medium text-muted-foreground">
                แสดงความคิดเห็นในชื่อ:
              </span>
              <span className="text-sm font-bold text-foreground">
                {session?.user?.name}
              </span>
            </div>

            <textarea
              placeholder="แสดงความคิดเห็น..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-24 px-4 py-3 rounded-lg bg-muted/50 border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-sm"
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || !content}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            ส่งความคิดเห็น
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-8 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id} // แก้ไข 1: ใช้ comment.id
              className="group flex gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-border/50"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm text-foreground">
                    {comment.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {session?.user?.role === "ADMIN" && (
                      <button
                        onClick={() => handleDelete(comment.postId)} // แก้ไข 2: ส่ง comment.id
                        className="text-muted-foreground hover:text-destructive p-1 rounded-md hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                        title="ลบความคิดเห็น"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            ยังไม่มีความคิดเห็น เป็นคนแรกที่เริ่มพูดคุยสิ!
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
