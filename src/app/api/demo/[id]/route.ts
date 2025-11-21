import { DemoData } from '@/features/demo/entity/DemoData';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/demo/[id] - Get single item
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;

  // Simulate database lookup
  if (id === 'not-found') {
    return NextResponse.json({
      message: 'Item not found',
      success: false,
    }, { status: 404 });
  }

  return NextResponse.json({
    data: {
      id,
      message: `Item ${id}`,
      timestamp: Date.now()
    },
    success: true,
  });
}

// PUT /api/demo/[id] - Update item
export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    const body: DemoData = await request.json();

    return NextResponse.json({
      data: { id, ...body, timestamp: Date.now() },
      message: 'Item updated successfully',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Invalid request body',
      success: false,
    }, { status: 400 });
  }
}

// DELETE /api/demo/[id] - Delete item
export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params;

  return NextResponse.json({
    message: `Item ${id} deleted successfully`,
    success: true,
  });
}
