import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// api/getCategories/route.rs
// หา getCategories ทั้งหมด
export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.category.findMany();
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch getCategories" },
      { status: 500 }
    );
  }
}
 