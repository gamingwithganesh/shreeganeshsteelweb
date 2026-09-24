'use client';

import React, { useState } from 'react';
import { useCart, UserProfile, VIDARBHA_CITIES } from '@/context/CartContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser } = useCart();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  // Login Form
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // Signup Form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(VIDARBHA_CITIES[0].name);
  const [signupPassword, setSignupPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIdentifier('');
    setPassword('');
    setErrorMsg('');
    setIsAuthModalOpen(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanId = identifier.trim();
    const cleanPw = password.trim();

    if (!cleanId) {
      setErrorMsg('Please enter your email or mobile number.');
      return;
    }
    if (!cleanPw) {
      setErrorMsg('Please enter your password.');
      return;
    }

    const lowerId = cleanId.toLowerCase();

    // 1. Admin Authentication:
    // If entered admin id & password (ganeshb.shende0@gmail.com / ganeshb.shende0@gmail.com or admin / ganeshb.shende0@gmail.com)
    if (
      (lowerId === 'ganeshb.shende0@gmail.com' || lowerId === 'admin') &&
      cleanPw === 'ganeshb.shende0@gmail.com'
    ) {
      const adminSession = {
        id: 'usr-admin-1',
        name: 'Ganesh Shende',
        email: 'ganeshb.shende0@gmail.com',
        password: 'ganeshb.shende0@gmail.com',
        role: 'superadmin',
        status: 'active',
        department: 'Workshop Operations & Administration',
        phone: '+91 94230 32182',
        createdAt: '2026-01-01T00:00:00.000Z',
      };
      try {
        localStorage.setItem('sgwwsp_current_admin_v2', JSON.stringify(adminSession));
      } catch (err) {}
      handleClose();
      window.location.href = '/admin';
      return;
    }

    // 2. Regular User Authentication
    const isEmail = lowerId.includes('@');
    const user: UserProfile = {
      name: isEmail ? lowerId.split('@')[0] : `Client (${cleanId})`,
      phone: isEmail ? '' : cleanId,
      email: isEmail ? lowerId : `${cleanId}@client.sgwwsp.com`,
      city: 'Ghatanji',
      address: 'Workshop Client Delivery Site',
    };

    loginUser(user);
    handleClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please provide your name and mobile number.');
      return;
    }

    const newUser: UserProfile = {
      name: fullName.trim(),
      phone: phone.trim(),
      email: `${phone.trim()}@client.sgwwsp.com`,
      city: city,
      address: `${city} Site Location`,
    };

    loginUser(newUser);
    handleClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '420px',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            border: 'none',
            color: '#64748b',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
        >
          ✕
        </button>

        {/* Minimal Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.85rem',
              marginBottom: '1rem',
            }}
          >
            SG
          </div>
          <h2
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '-0.025em',
              margin: '0 0 0.25rem 0',
            }}
          >
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <p style={{ margin: 0, fontSize: '0.825rem', color: '#64748b' }}>
            {tab === 'login'
              ? 'Enter your credentials to access your account'
              : 'Register to manage orders and tracking'}
          </p>
        </div>

        {/* Minimalist Tabs */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '3px',
            borderRadius: '10px',
            marginBottom: '1.5rem',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setErrorMsg('');
            }}
            style={{
              flex: 1,
              padding: '7px 0',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: tab === 'login' ? 600 : 500,
              fontSize: '0.825rem',
              backgroundColor: tab === 'login' ? '#ffffff' : 'transparent',
              color: tab === 'login' ? '#000000' : '#64748b',
              boxShadow: tab === 'login' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setErrorMsg('');
            }}
            style={{
              flex: 1,
              padding: '7px 0',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: tab === 'signup' ? 600 : 500,
              fontSize: '0.825rem',
              backgroundColor: tab === 'signup' ? '#ffffff' : 'transparent',
              color: tab === 'signup' ? '#000000' : '#64748b',
              boxShadow: tab === 'signup' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fee2e2',
              color: '#dc2626',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              marginBottom: '1rem',
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Tab 1: Sign In */}
        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} autoComplete="off">
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '5px',
                }}
              >
                Email or Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter email or mobile"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="off"
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.875rem',
                  color: '#0f172a',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#000000')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '5px',
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.875rem',
                  color: '#0f172a',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#000000')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
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
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
            >
              Sign In
            </button>
          </form>
        ) : (
          /* Tab 2: Register */
          <form onSubmit={handleSignupSubmit} autoComplete="off">
            <div style={{ marginBottom: '0.85rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '4px',
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#000000')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
            </div>

            <div style={{ marginBottom: '0.85rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '4px',
                }}
              >
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#000000')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
            </div>

            <div style={{ marginBottom: '0.85rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '4px',
                }}
              >
                City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              >
                {VIDARBHA_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '4px',
                }}
              >
                Create Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#000000')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
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
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
