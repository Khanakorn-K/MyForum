import mockImageData from "@/utils/mockImageData";
import Image from "next/image";
import { PostListentity } from "../entity/PostListentity";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
const CardPost = ({
  id = "1",
  content = "นี่คือ mock content สำหรับโพสต์ตัวอย่าง",
  coverImage = "",
  displayDisplayCreateAt = "2024-01-01",
  slug = ["mock-post"],
  title = "Mock Post Title",
  authorImage = mockImageData(),
  authorName = "anonymounse",
}: Partial<PostListentity>) => {
  const session = useSession();
  return (
    <article className="group w-1/2 h-1/2 relative flex flex-col overflow-hidden rounded-2xl bg-card text-card-foreground shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          width={800}
          height={450}
          src={coverImage || mockImageData()}
          alt={title || "Post cover"}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Tag */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm shadow-sm">
            {Array.isArray(slug) ? slug[0] : slug}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Calendar className="h-3.5 w-3.5" />
          <time dateTime={displayDisplayCreateAt}>
            {displayDisplayCreateAt}
          </time>
        </div>

        <h3 className="mb-2 line-clamp-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>

        <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground leading-relaxed">
          {content}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <Link href={`/post?id=${id}`}>
            <div className="flex items-center text-sm font-medium text-primary">
              Read article
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
          <div className=" flex flex-row gap-2 items-center">
            <Image
              src={authorImage}
              width={50}
              height={50}
              alt={authorName}
              className="rounded-full w-10 h-10"
            />
            <h2>ผู้เขียน : {authorName}</h2>
            <Link className="bg-red-600 p-2 rounded-full" href={`createPost?postId=${id}`}>
              <p>แก้ไข้</p>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardPost;
