import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { generateSlug } from "@/utils/generateSlug";

// POST /api/post - Create a new post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const body = await request.json();
    const { title, excerpt, content, coverImage, published, categories, tags } =
      body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Title and content are required",
        },
        { status: 400 }
      );
    }

    // Generate slug from title
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // TODO: Get authorId from session
    // For now, we'll need to get the first user or create a default user
    // สำหรับทดสอบอย่าลืมกลับมาแก้
    const author = session?.user ?? (await prisma.user.findFirst());

    if (!author) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "No user found. Please create a user first.",
        },
        { status: 400 }
      );
    }

    // Process categories - connect existing or create new ones
    const categoryConnections = [];
    if (categories && Array.isArray(categories) && categories.length > 0) {
      for (const categoryName of categories) {
        if (!categoryName || typeof categoryName !== "string") continue;

        const categorySlug = generateSlug(categoryName);

        // Find or create category
        const category = await prisma.category.upsert({
          where: { slug: categorySlug },
          update: {},
          create: {
            name: categoryName,
            slug: categorySlug,
          },
        });

        categoryConnections.push({ id: category.id });
      }
    }

    // Process tags - connect existing or create new ones
    const tagConnections = [];
    if (tags && Array.isArray(tags) && tags.length > 0) {
      for (const tagName of tags) {
        if (!tagName || typeof tagName !== "string") continue;

        const tagSlug = generateSlug(tagName);

        // Find or create tag
        const tag = await prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: {
            name: tagName,
            slug: tagSlug,
          },
        });

        tagConnections.push({ id: tag.id });
      }
    }

    // Create post with categories and tags
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImage,
        published: published || false,
        publishedAt: published ? new Date() : null,
        author: {
          connect: {
            id: author.id,
          },
        },
        categories: {
          connect: categoryConnections,
        },
        tags: {
          connect: tagConnections,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
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
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create post";
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: errorMessage,
      },
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

    const categoryConnections = [];
    if (categories && Array.isArray(categories)) {
      for (const catName of categories) {
        const slug = generateSlug(catName);
        const category = await prisma.category.upsert({
          where: { slug },
          create: { name: catName, slug },
          update: {},
        });
        categoryConnections.push({ id: category.id });
      }
    }

    // Process Tags
    const tagConnections = [];
    if (tags && Array.isArray(tags)) {
      for (const tagName of tags) {
        const slug = generateSlug(tagName);
        const tag = await prisma.tag.upsert({
          where: { slug },
          create: { name: tagName, slug },
          update: {},
        });
        tagConnections.push({ id: tag.id });
      }
    }

    // Update Post
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
          connect: categoryConnections,
        },
        tags: {
          set: [],
          connect: tagConnections,
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
