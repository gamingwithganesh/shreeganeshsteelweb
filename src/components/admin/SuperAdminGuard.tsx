'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';

interface SuperAdminGuardProps {
  children: React.ReactNode;
}

export default function SuperAdminGuard({ children }: SuperAdminGuardProps) {
  const { currentAdmin, login, logout } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSuperLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(email, password);
    if (!res.success) {
      setErrorMsg(res.message);
    } else if (res.user?.role !== 'superadmin') {
      setErrorMsg('Unauthorized: This account does not possess Super Admin master privileges.');
    }
  };

  // 1. Not logged in OR logged in as standard store admin
  if (!currentAdmin || currentAdmin.role !== 'superadmin') {
    return (
      <div
        style={{
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
          backgroundColor: '#060a12',
          backgroundImage: 'radial-gradient(ellipse at top, rgba(29,103,150,0.18) 0%, transparent 70%)',
        }}
      >
        <div
          style={{
            maxWidth: '480px',
            width: '100%',
            backgroundColor: '#0c1524',
            borderRadius: '24px',
            border: '1px solid rgba(56, 158, 211, 0.3)',
            padding: '2.5rem 2.25rem',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #e11d48, #991b1b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '1.8rem',
                margin: '0 auto 1.25rem',
                boxShadow: '0 8px 24px rgba(225, 29, 72, 0.4)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#fb7185',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                backgroundColor: 'rgba(225, 29, 72, 0.12)',
                padding: '4px 12px',
                borderRadius: '9999px',
                display: 'inline-block',
                marginBottom: '0.5rem',
              }}
            >
              Z INTECH PRIVATE LIMITED • Master Authority
            </span>
            <h2 className="font-display" style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Super Admin Command Center
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Restricted platform control for multi-store admin administration, system analytics, and master credentials.
            </p>
          </div>

          {currentAdmin && currentAdmin.role !== 'superadmin' && (
            <div
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                color: '#fbbf24',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Currently logged in as Store Admin (<strong>{currentAdmin.name}</strong>).</span>
              <button
                type="button"
                onClick={logout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              >
                Sign Out
              </button>
            </div>
          )}

          {errorMsg && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSuperLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                Super Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="superadmin@zintech.com"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                Master Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(225, 29, 72, 0.35)',
                transition: 'all 0.2s',
              }}
            >
              Authenticate as Super Admin →
            </button>
          </form>

          {/* Quick Demo Autofill */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Default Super Admin Demo:</span>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  setEmail('superadmin@zintech.com');
                  setPassword('zintech123');
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#68bae2',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Auto-Fill Default Credentials
              </button>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Link href="/admin" style={{ color: '#94a3b8', fontSize: '0.78rem', textDecoration: 'underline' }}>
                Go to Store Admin Panel (/admin)
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
