import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { generateSlug } from "@/utils/generateSlug";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    const { title, excerpt, content, coverImage, published, categories, tags } =
      body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Post ID is required" },
        { status: 400 }
      );
    }
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const categoryIds: { id: string }[] = [];
    if (categories && Array.isArray(categories) && categories.length > 0) {
      const results = await Promise.all(
        categories.map(async (name: string) => {
          const s = generateSlug(name) || `cat-${Date.now()}-${Math.random()}`;
          return prisma.category.upsert({
            where: { slug: s },
            update: {},
            create: { name, slug: s },
          });
        })
      );
      results.forEach((c) => categoryIds.push({ id: c.id }));
    }

    const tagIds: { id: string }[] = [];
    if (tags && Array.isArray(tags) && tags.length > 0) {
      const results = await Promise.all(
        tags.map(async (name: string) => {
          const s = generateSlug(name) || `tag-${Date.now()}-${Math.random()}`;
          return prisma.tag.upsert({
            where: { slug: s },
            update: {},
            create: { name, slug: s },
          });
        })
      );
      results.forEach((t) => tagIds.push({ id: t.id }));
    }
    // เพิ่มก่อนทำการ update
    const existingPost = await prisma.post.findUnique({ where: { id } });

    if (!existingPost) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    // เช็คสิทธิ์: ต้องเป็นเจ้าของ หรือ เป็น Admin
    if (existingPost.authorId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        excerpt,
        content,
        coverImage,
        published,
        updatedAt: new Date(),
        categories: {
          set: [],
          connect: categoryIds,
        },
        tags: {
          set: [],
          connect: tagIds,
        },
      },
    });

    return NextResponse.json({
      success: true,
      id: updatedPost.id,
      message: "Post updated successfully",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update post" },
      { status: 500 }
    );
  }
}
