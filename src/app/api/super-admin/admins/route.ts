import { NextResponse } from 'next/server';
import { apiStore } from '@/data/apiStore';

// GET /api/super-admin/admins
export async function GET() {
  const users = apiStore.getUsers();
  const orders = apiStore.getOrders();
  const products = apiStore.getProducts();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const activeAdminsCount = users.filter((u) => u.status === 'active').length;
  const pausedAdminsCount = users.filter((u) => u.status === 'paused').length;

  return NextResponse.json({
    success: true,
    platformStats: {
      totalRevenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalAdmins: users.length,
      activeAdminsCount,
      pausedAdminsCount,
    },
    admins: users.map(({ password, ...rest }) => rest),
  });
}

// POST /api/super-admin/admins
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, department, phone } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required fields.' },
        { status: 400 }
      );
    }

    const users = apiStore.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'An admin account with this email already exists.' },
        { status: 409 }
      );
    }

    const newAdmin = {
      id: 'usr-admin-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      role: 'admin' as const,
      status: 'active' as const,
      department: department || 'Operations',
      phone: phone || '',
      createdAt: new Date().toISOString(),
    };

    apiStore.setUsers([newAdmin, ...users]);

    const { password: _, ...safeAdmin } = newAdmin;

    return NextResponse.json(
      {
        success: true,
        message: `Admin account for ${name} created successfully!`,
        admin: safeAdmin,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT /api/super-admin/admins
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, adminId, status, department, password, name, email } = body;
    const targetId = id || adminId;

    if (!targetId) {
      return NextResponse.json(
        { success: false, message: 'Admin ID is required to perform an update.' },
        { status: 400 }
      );
    }

    const users = apiStore.getUsers();
    const index = users.findIndex((u) => u.id === targetId);
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Admin account not found.' },
        { status: 404 }
      );
    }

    const updatedUser = {
      ...users[index],
      ...(name ? { name: name.trim() } : {}),
      ...(email ? { email: email.trim().toLowerCase() } : {}),
      ...(status ? { status } : {}),
      ...(department ? { department: department.trim() } : {}),
      ...(password ? { password: password.trim() } : {}),
      updatedAt: new Date().toISOString(),
    };

    users[index] = updatedUser;
    apiStore.setUsers([...users]);

    const { password: _, ...safeAdmin } = updatedUser;

    return NextResponse.json({
      success: true,
      message: `Admin ${safeAdmin.name} updated successfully.`,
      admin: safeAdmin,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE /api/super-admin/admins?adminId=...
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get('adminId') || searchParams.get('id');

    if (!adminId) {
      return NextResponse.json(
        { success: false, message: 'adminId query parameter is required.' },
        { status: 400 }
      );
    }

    const users = apiStore.getUsers();
    const target = users.find((u) => u.id === adminId);

    if (!target) {
      return NextResponse.json(
        { success: false, message: 'Admin account not found.' },
        { status: 404 }
      );
    }

    if (target.role === 'superadmin') {
      return NextResponse.json(
        { success: false, message: 'Root Super Admin account cannot be deleted.' },
        { status: 403 }
      );
    }

    apiStore.setUsers(users.filter((u) => u.id !== adminId));

    return NextResponse.json({
      success: true,
      message: `Admin account for ${target.name} permanently deleted.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
