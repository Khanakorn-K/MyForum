import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

function generateSlug(title: string): string {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0E00-\u0E7F-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { title, excerpt, content, coverImage, published, categories, tags } =
      body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and content are required" },
        { status: 400 }
      );
    }

    const baseSlug = generateSlug(title) || `post-${Date.now()}`;
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const author = session?.user ?? (await prisma.user.findFirst());

    if (!author) {
      return NextResponse.json(
        { success: false, message: "No user found." },
        { status: 400 }
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

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage,
        published: published || false,
        publishedAt: published ? new Date() : null,
        authorId: author.id,
        // author: {
        //   connect: { id: author.id },
        // },
        categories: {
          connect: categoryIds,
        },
        tags: {
          connect: tagIds,
        },
      },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
        categories: true,
        tags: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: post,
      message: "Post created successfully",
      id: post.id,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
      data: updatedPost,
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
