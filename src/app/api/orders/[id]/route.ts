import { NextResponse } from 'next/server';
import { apiStore } from '@/data/apiStore';

interface RouteContext {
  params: { id: string };
}

// PUT /api/orders/[id]
export async function PUT(req: Request, context: RouteContext) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const orders = apiStore.getOrders();
    const index = orders.findIndex((o) => o.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Order not found.' }, { status: 404 });
    }

    const updated = {
      ...orders[index],
      ...body,
      id,
    };

    orders[index] = updated;
    apiStore.setOrders([...orders]);

    return NextResponse.json({
      success: true,
      message: `Order #${updated.orderNumber} status updated to ${updated.status}.`,
      order: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE /api/orders/[id]
export async function DELETE(req: Request, context: RouteContext) {
  try {
    const { id } = context.params;
    const orders = apiStore.getOrders();
    const target = orders.find((o) => o.id === id);

    if (!target) {
      return NextResponse.json({ success: false, message: 'Order not found.' }, { status: 404 });
    }

    apiStore.setOrders(orders.filter((o) => o.id !== id));

    return NextResponse.json({
      success: true,
      message: `Order #${target.orderNumber} deleted successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
