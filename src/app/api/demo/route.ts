import { DemoData } from '@/features/demo/entity/DemoData';
import { NextResponse } from 'next/server';

// GET /api/demo - List all items
export async function GET() {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    data: [
      { id: '1', message: 'Item 1', timestamp: Date.now() },
      { id: '2', message: 'Item 2', timestamp: Date.now() },
    ],
    success: true,
  });
}

// POST /api/demo - Create new item
export async function POST(request: Request) {
  try {
    const body: DemoData = await request.json();

    // Simulate database creation
    const newItem = {
      id: Math.random().toString(36).substring(7),
      message: body.message,
      timestamp: Date.now(),
    };

    return NextResponse.json({
      data: newItem,
      message: 'Item created successfully',
      success: true,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: 'Invalid request body',
      success: false,
    }, { status: 400 });
  }
}
