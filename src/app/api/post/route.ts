import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    if (id) {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          categories: true,
          tags: true,
          author: true,
        },
      });
      return NextResponse.json({ success: true, data: post });
    }

    const skip = Number(searchParams.get("skip") ?? 0);
    const take = Number(searchParams.get("take") ?? 10);

    const posts = await prisma.post.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, name: true, email: true, image: true } },
        categories: true,
        tags: true,
      },
    });

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, categorySlug, skip, take } = body;

    if (!slug && !categorySlug) {
      return NextResponse.json(
        { success: false, message: "Slug or CategorySlug is required" },
        { status: 400 }
      );
    }

    let whereCondition = {};

    if (slug) {
      whereCondition = {
        tags: {
          some: {
            slug: slug,
          },
        },
      };
    } else if (categorySlug) {
      whereCondition = {
        categories: {
          some: {
            slug: categorySlug,
          },
        },
      };
    }

    const posts = await prisma.post.findMany({
      skip: Number(skip ?? 0),
      take: Number(take ?? 10),
      where: whereCondition,
      include: {
        author: { select: { id: true, name: true, image: true } },
        categories: true,
        tags: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
