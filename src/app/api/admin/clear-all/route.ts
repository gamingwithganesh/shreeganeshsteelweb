import { NextResponse } from 'next/server';
import { apiStore } from '@/data/apiStore';

// POST /api/admin/clear-all
export async function POST() {
  try {
    apiStore.clearAll();
    return NextResponse.json({
      success: true,
      message: 'Store catalog and orders cleared from scratch.',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
