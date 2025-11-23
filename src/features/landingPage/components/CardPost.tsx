import mockImageData from "@/utils/mockImageData";
import Image from "next/image";
import { PostListentity } from "../entity/PostListentity";
import { Button } from "@/components/ui/Button";

const CardPost = ({
  content = "นี่คือ mock content สำหรับโพสต์ตัวอย่าง",
  coverImage = "",
  displayDisplayCreateAt = "2024-01-01T00:00:00.000Z",
  slug = ["mock-post"],
  title = "Mock Post Title",
}: Partial<PostListentity>) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* รูปด้านบน */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <Image
          width={1200}
          height={800}
          src={coverImage || mockImageData()}
          alt={title ?? ""}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {/* แท็กเล็ก ๆ มุมบนซ้าย */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white mx-1">
            {slug}
          </span>
        </div>
      </div>

      {/* เนื้อหาด้านล่าง */}
      <div className="flex flex-1 flex-col gap-2 px-4 py-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
          {/* //ถ้าเกิน 60 ตัวให้แสดง ... พ้วงท้าย */}
          {title}
        </h3>

        <p className="line-clamp-3 text-sm text-slate-500">
          {content!.length > 60
            ? content?.substring(0, 60) + "..."
            : content ?? ""}
        </p>

        {/* footer เล็ก ๆ ด้านล่าง */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <Button variant= "secondary">
            <h1>อ่านต่อ...</h1>
          </Button>
          <p>{displayDisplayCreateAt}</p>
        </div>
      </div>
    </article>
  );
};

export default CardPost;
