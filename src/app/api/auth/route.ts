import { NextResponse } from 'next/server';
import { apiStore } from '@/data/apiStore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password, name, department, phone } = body;

    const users = apiStore.getUsers();

    if (action === 'register') {
      if (!email || !password || !name) {
        return NextResponse.json(
          { success: false, message: 'Name, email and password are required for registration.' },
          { status: 400 }
        );
      }

      const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (existing) {
        return NextResponse.json(
          { success: false, message: 'An account with this email address already exists.' },
          { status: 409 }
        );
      }

      const newUser = {
        id: 'usr-' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        role: 'admin' as const,
        status: 'active' as const,
        department: department || 'Workshop Operations',
        phone: phone || '',
        createdAt: new Date().toISOString(),
      };

      apiStore.setUsers([newUser, ...users]);

      return NextResponse.json(
        {
          success: true,
          message: 'Account registered successfully!',
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: newUser.status,
            department: newUser.department,
          },
        },
        { status: 201 }
      );
    }

    // Default Action: Login
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPw = password.trim();

    const user = users.find(
      (u) =>
        (u.email.toLowerCase() === cleanEmail ||
          (cleanEmail === 'admin' && u.email === 'ganeshb.shende0@gmail.com') ||
          (cleanEmail === 'ganeshb.shende0@gmail.com')) &&
        u.password === cleanPw
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid administrative credentials.' },
        { status: 401 }
      );
    }

    if (user.status === 'paused') {
      return NextResponse.json(
        {
          success: false,
          message: 'Account Suspended: This administrator account has been paused by Z INTECH Super Admin.',
          status: 'paused',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        department: user.department,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
