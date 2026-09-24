'use client';

import React from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';
import AdminLogin from './AdminLogin';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { currentAdmin, logout } = useAdmin();

  // 1. Not logged in
  if (!currentAdmin) {
    return <AdminLogin />;
  }

  // 2. Account paused / suspended enforcement
  if (currentAdmin.status === 'paused') {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
          backgroundColor: '#070d18',
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            width: '100%',
            backgroundColor: '#0c1626',
            borderRadius: '24px',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: '0 25px 60px -15px rgba(239, 68, 68, 0.25)',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '2px solid rgba(239, 68, 68, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 1.5rem',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#f87171',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              padding: '4px 12px',
              borderRadius: '9999px',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            Access Revoked • Account Suspended
          </span>

          <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            Administrator Access Paused
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            The workshop admin account for <strong>{currentAdmin.name}</strong> ({currentAdmin.email}) has been temporarily paused.
          </p>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '1rem',
              fontSize: '0.8rem',
              color: '#cbd5e1',
              textAlign: 'left',
              marginBottom: '2rem',
            }}
          >
            <div><strong>Workshop:</strong> Shree Ganesh Steel &amp; Welding Workshop</div>
            <div><strong>Role:</strong> {currentAdmin.role.toUpperCase()}</div>
            <div><strong>Helpline:</strong> +91 94230 32182 / admin@sgwwsp.com</div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={logout}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Sign Out &amp; Switch Account
            </button>
            <Link
              href="/"
              style={{
                background: '#1d6796',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. User is active admin or superadmin
  return <>{children}</>;
}
