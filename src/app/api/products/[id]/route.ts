import { NextResponse } from 'next/server';
import { apiStore } from '@/data/apiStore';

interface RouteContext {
  params: { id: string };
}

// PUT /api/products/[id]
export async function PUT(req: Request, context: RouteContext) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const products = apiStore.getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Product not found.' }, { status: 404 });
    }

    const updated = {
      ...products[index],
      ...body,
      id,
    };

    products[index] = updated;
    apiStore.setProducts([...products]);

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully.',
      product: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(req: Request, context: RouteContext) {
  try {
    const { id } = context.params;
    const products = apiStore.getProducts();
    const target = products.find((p) => p.id === id);

    if (!target) {
      return NextResponse.json({ success: false, message: 'Product not found.' }, { status: 404 });
    }

    apiStore.setProducts(products.filter((p) => p.id !== id));

    return NextResponse.json({
      success: true,
      message: `Product "${target.name}" deleted successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
