import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PostRequestModel } from "@/features/post/models/PostRequestModel";

// GET /api/post - Get
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
