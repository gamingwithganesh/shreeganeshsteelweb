import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    // Ping database
    const pingResult = await db.command({ ping: 1 });
    return NextResponse.json({
      status: 'online',
      database: db.databaseName,
      ping: pingResult,
      timestamp: new Date().toISOString(),
      message: 'MongoDB Atlas connection active and healthy.',
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Could not connect to MongoDB Atlas.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
