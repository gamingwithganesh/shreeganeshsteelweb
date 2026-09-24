import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { PRODUCTS } from '@/data/products';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('products');

    let products = await collection.find({}).toArray();

    // If database is empty, seed it with the default workshop products
    if (products.length === 0) {
      const initialWithStrings = PRODUCTS.map((p) => ({ ...p, _id: undefined }));
      await collection.insertMany(initialWithStrings as any);
      products = await collection.find({}).toArray();
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    console.error('MongoDB products GET error:', error);
    // Fallback to static PRODUCTS
    return NextResponse.json({ success: true, count: PRODUCTS.length, products: PRODUCTS, fallback: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    const collection = db.collection('products');

    const newProduct = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(newProduct);
    return NextResponse.json({ success: true, insertedId: result.insertedId, product: newProduct });
  } catch (error: any) {
    console.error('MongoDB products POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { db } = await connectToDatabase();
    const collection = db.collection('products');

    if (!id) {
      // Clear all
      await collection.deleteMany({});
      return NextResponse.json({ success: true, message: 'All products removed from database.' });
    }

    await collection.deleteOne({ id });
    return NextResponse.json({ success: true, message: `Product ${id} deleted.` });
  } catch (error: any) {
    console.error('MongoDB products DELETE error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
