'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';

export default function AdminLogin() {
  const { login } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = login(username, password);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 62px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
          padding: '2.25rem 2rem',
        }}
      >
        {/* Brand & Minimal Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#000000',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1rem',
              marginBottom: '1rem',
            }}
          >
            SG
          </div>

          <h1
            style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#0f172a',
              margin: '0 0 0.35rem',
              letterSpacing: '-0.025em',
            }}
          >
            Admin Sign In
          </h1>
          <p style={{ fontSize: '0.825rem', color: '#64748b', margin: 0 }}>
            Shree Ganesh Steel • Management Console
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fee2e2',
              color: '#dc2626',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              fontSize: '0.825rem',
              lineHeight: 1.4,
              marginBottom: '1.25rem',
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#334155',
                marginBottom: '0.35rem',
              }}
            >
              Email or Username
            </label>
            <input
              type="text"
              required
              placeholder="ganeshb.shende0@gmail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                fontSize: '0.875rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#000000')}
              onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#334155',
                marginBottom: '0.35rem',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 3rem 9px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  fontSize: '0.875rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#000000')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: '#000000',
              color: '#ffffff',
              border: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
          >
            Sign In to Dashboard →
          </button>
        </form>

        {/* Back Link */}
        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.825rem' }}>
          <Link
            href="/"
            style={{
              color: '#64748b',
              textDecoration: 'none',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            ← Back to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
