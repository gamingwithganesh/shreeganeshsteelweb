import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { INITIAL_ORDERS } from '@/data/adminInitialData';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('orders');

    const orders = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    console.error('MongoDB orders GET error:', error);
    return NextResponse.json({ success: true, count: 0, orders: [], fallback: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    const collection = db.collection('orders');

    const newOrder = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(newOrder);
    return NextResponse.json({ success: true, insertedId: result.insertedId, order: newOrder });
  } catch (error: any) {
    console.error('MongoDB orders POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, orderId, orderNumber, status } = body;
    const { db } = await connectToDatabase();
    const collection = db.collection('orders');

    const searchCriteria = [
      id ? { id } : null,
      id ? { orderId: id } : null,
      id ? { orderNumber: id } : null,
      orderId ? { orderId } : null,
      orderNumber ? { orderNumber } : null,
    ].filter(Boolean) as any[];

    if (searchCriteria.length > 0) {
      await collection.updateMany(
        { $or: searchCriteria },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );
    }

    return NextResponse.json({ success: true, message: `Order updated to ${status}.` });
  } catch (error: any) {
    console.error('MongoDB orders PUT error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
