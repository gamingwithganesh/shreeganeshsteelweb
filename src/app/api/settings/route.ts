import { NextResponse } from 'next/server';
import { apiStore } from '@/data/apiStore';

// GET /api/settings
export async function GET() {
  const settings = apiStore.getSettings();
  return NextResponse.json({
    success: true,
    settings,
  });
}

// POST /api/settings
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const current = apiStore.getSettings();

    const updated = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    apiStore.setSettings(updated);

    return NextResponse.json({
      success: true,
      message: 'Promotional and hero banner settings updated successfully!',
      settings: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
