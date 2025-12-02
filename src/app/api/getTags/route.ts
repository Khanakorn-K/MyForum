import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// api/tags/route.rs
// หา tags ทั้งหมด
export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.tag.findMany();
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
 