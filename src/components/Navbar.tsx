'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, ProductItem } from '@/data/products';
import { useLiveProducts } from '@/hooks/useLiveProducts';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, currentUser, setIsAuthModalOpen, logoutUser } = useCart();
  const { products: liveProducts } = useLiveProducts();
  const [currentAdmin, setCurrentAdmin] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const checkAdmin = () => {
      try {
        const saved = localStorage.getItem('sgwwsp_current_admin_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && (parsed.email || parsed.name)) {
            setCurrentAdmin(parsed);
            return;
          }
        }
        setCurrentAdmin(null);
      } catch (e) {
        setCurrentAdmin(null);
      }
    };
    checkAdmin();
    window.addEventListener('storage', checkAdmin);
    window.addEventListener('sgwwsp_admin_auth_changed', checkAdmin);
    return () => {
      window.removeEventListener('storage', checkAdmin);
      window.removeEventListener('sgwwsp_admin_auth_changed', checkAdmin);
    };
  }, [pathname]);

  const handleAdminLogout = () => {
    try {
      localStorage.removeItem('sgwwsp_current_admin_v2');
    } catch (e) {}
    setCurrentAdmin(null);
    window.location.href = '/';
  };

  // Search states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductItem[]>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // Track Order states
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [recentOrderId, setRecentOrderId] = useState<string | null>(null);
  const trackContainerRef = useRef<HTMLDivElement | null>(null);
  const trackInputRef = useRef<HTMLInputElement | null>(null);

  // User dropdown menu state
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Close search, track popover & menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (trackContainerRef.current && !trackContainerRef.current.contains(e.target as Node)) {
        setIsTrackOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu & popovers on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
    setIsTrackOpen(false);
  }, [pathname]);

  // Load recent order ID for 1-click tracking
  useEffect(() => {
    try {
      const lastOrder = localStorage.getItem('sgwwsp_last_placed_bill');
      if (lastOrder) {
        const parsed = JSON.parse(lastOrder);
        if (parsed?.orderId) {
          setRecentOrderId(parsed.orderId);
          return;
        }
      }
      const savedOrders = localStorage.getItem('sgwwsp_user_orders');
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.orderId) {
          setRecentOrderId(parsed[0].orderId);
          return;
        }
      }
    } catch (e) {}
  }, [pathname, isTrackOpen]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const q = searchQuery.toLowerCase().trim();
      const matches = liveProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(matches);
    }, 180);

    return () => clearTimeout(timer);
  }, [searchQuery, liveProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTrackSubmit = (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const id = (customId !== undefined ? customId : trackOrderId).trim();
    setIsTrackOpen(false);
    setIsMobileMenuOpen(false);
    if (id) {
      router.push(`/track-order?id=${encodeURIComponent(id)}`);
    } else {
      router.push('/track-order');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blogs', href: '/blogs' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.2s ease',
        }}
      >
        <div
          className="container-custom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          {/* 1. Left: Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexShrink: 0 }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              {/* Modern Minimal Prism Icon */}
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '7px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #ec4899 50%, #f97316 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(236, 72, 153, 0.25)',
                  flexShrink: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', whiteSpace: 'nowrap' }}>
                <span
                  style={{
                    fontSize: 'clamp(0.95rem, 3.2vw, 1.05rem)',
                    fontWeight: 700,
                    color: '#0f172a',
                    letterSpacing: '-0.025em',
                  }}
                >
                  Shree Ganesh
                </span>
                <span
                  style={{
                    fontSize: 'clamp(0.95rem, 3.2vw, 1.05rem)',
                    fontWeight: 400,
                    color: '#64748b',
                    letterSpacing: '-0.025em',
                  }}
                >
                  Steel
                </span>
              </div>
            </Link>

            {/* 2. Center Nav: EXACTLY 5 LINKS (Home, Shop, About, Contact, Blogs) */}
            <nav
              className="hidden-mobile-nav"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              {navLinks.map((item) => {
                const active = isActiveLink(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.9rem',
                      fontWeight: active ? 600 : 500,
                      color: active ? '#000000' : '#475569',
                      backgroundColor: active ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                        e.currentTarget.style.color = '#000000';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#475569';
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* 3. Right: Search, Cart, Single Unified Login Button & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 1.5vw, 0.75rem)', flexShrink: 0 }}>
            {/* Search Trigger */}
            <div style={{ position: 'relative' }} ref={searchContainerRef}>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isSearchOpen ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
                  border: 'none',
                  color: '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title="Search products"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isSearchOpen ? 'rgba(0, 0, 0, 0.06)' : 'transparent')}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              {/* Minimal Search Floating Popover */}
              {isSearchOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '320px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
                    padding: '12px',
                    zIndex: 200,
                  }}
                >
                  <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f8fafc', borderRadius: '10px', padding: '6px 12px', border: '1px solid #e2e8f0' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search gates, railings, PEB..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.85rem', color: '#0f172a' }}
                    />
                  </form>

                  {searchResults.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      {searchResults.map((item) => (
                        <Link
                          key={item.id}
                          href={`/shop/${item.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          style={{ display: 'block', padding: '6px 8px', borderRadius: '6px', fontSize: '0.825rem', color: '#0f172a', textDecoration: 'none', transition: 'background 0.12s' }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.price} • {item.material}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Track Order Trigger & Popover (Desktop / Tablet only; mobile has it in drawer) */}
            <div className="hidden-mobile-nav" style={{ position: 'relative' }} ref={trackContainerRef}>
              <button
                type="button"
                onClick={() => {
                  const nextState = !isTrackOpen;
                  setIsTrackOpen(nextState);
                  if (nextState) {
                    setIsSearchOpen(false);
                    setIsUserMenuOpen(false);
                    setTimeout(() => trackInputRef.current?.focus(), 100);
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '9999px',
                  backgroundColor: isTrackOpen ? '#000000' : 'rgba(0, 0, 0, 0.04)',
                  color: isTrackOpen ? '#ffffff' : '#0f172a',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                title="Track order by ID"
                onMouseEnter={(e) => {
                  if (!isTrackOpen) e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  if (!isTrackOpen) e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span className="hidden-mobile-nav">Track Order</span>
              </button>

              {/* Minimal Track Order Floating Popover */}
              {isTrackOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '320px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.18)',
                    padding: '16px',
                    zIndex: 220,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Track Order by ID</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsTrackOpen(false)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', fontSize: '1rem', lineHeight: 1, padding: '2px 4px' }}
                    >
                      ✕
                    </button>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                    Enter your Order ID (e.g. SG-2026-091) or phone to view live fabrication status.
                  </p>

                  <form onSubmit={handleTrackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f8fafc', borderRadius: '10px', padding: '8px 12px', border: '1px solid #e2e8f0' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        ref={trackInputRef}
                        type="text"
                        placeholder="e.g. SG-2026-091"
                        value={trackOrderId}
                        onChange={(e) => setTrackOrderId(e.target.value)}
                        style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.85rem', color: '#0f172a', fontWeight: 600 }}
                      />
                      {trackOrderId && (
                        <button
                          type="button"
                          onClick={() => setTrackOrderId('')}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', fontSize: '0.8rem' }}
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      style={{
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '9px 14px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
                    >
                      <span>Track Fabrication</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </form>

                  {recentOrderId && (
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Recent:</span>
                      <button
                        type="button"
                        onClick={() => handleTrackSubmit(undefined, recentOrderId)}
                        style={{
                          background: '#f1f5f9',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#0f172a',
                          cursor: 'pointer',
                        }}
                      >
                        {recentOrderId} ➔
                      </button>
                    </div>
                  )}

                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <Link
                      href="/track-order"
                      onClick={() => setIsTrackOpen(false)}
                      style={{ fontSize: '0.75rem', color: '#64748b', textDecoration: 'none', fontWeight: 500 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
                    >
                      Open Live Workshop Tracker ➔
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <Link
              href="/cart"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                color: '#0f172a',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="hidden-mobile-nav">Cart</span>
              {totalCartCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    padding: '1px 6px',
                  }}
                >
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* 4. Desktop Single Unified Login Button / Logged In User Pill */}
            <div className="hidden-mobile-nav" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {currentUser ? (
              <div style={{ position: 'relative' }} ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '7px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{currentUser.name.split(' ')[0]}</span>
                  <span style={{ fontSize: '0.65rem' }}>⌵</span>
                </button>

                {isUserMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: '190px',
                      backgroundColor: '#ffffff',
                      borderRadius: '14px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.15)',
                      padding: '8px',
                      zIndex: 150,
                    }}
                  >
                    <div style={{ padding: '6px 10px', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>{currentUser.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{currentUser.phone || currentUser.email}</div>
                    </div>
                    <Link
                      href="/cart"
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', fontSize: '0.825rem', color: '#334155', textDecoration: 'none', borderRadius: '6px', marginTop: '4px' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span>My Orders</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logoutUser();
                      }}
                      style={{ width: '100%', display: 'block', padding: '7px 10px', fontSize: '0.825rem', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderTop: '1px solid #f1f5f9', marginTop: '4px' }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (currentAdmin || (pathname && pathname.startsWith('/admin'))) ? (
              <div style={{ position: 'relative' }} ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '7px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Admin ({currentAdmin?.name ? currentAdmin.name.split(' ')[0] : 'Ganesh'})</span>
                  <span style={{ fontSize: '0.65rem', marginLeft: '2px' }}>⌵</span>
                </button>

                {isUserMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: '200px',
                      backgroundColor: '#ffffff',
                      borderRadius: '14px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.15)',
                      padding: '8px',
                      zIndex: 150,
                    }}
                  >
                    <div style={{ padding: '6px 10px', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>{currentAdmin?.name || 'Ganesh Shende'}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{currentAdmin?.email || 'ganeshb.shende0@gmail.com'}</div>
                    </div>
                    <Link
                      href="/"
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', fontSize: '0.825rem', color: '#334155', textDecoration: 'none', borderRadius: '6px', marginTop: '4px' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      <span>Storefront</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleAdminLogout();
                      }}
                      style={{ width: '100%', display: 'block', padding: '7px 10px', fontSize: '0.825rem', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderTop: '1px solid #f1f5f9', marginTop: '4px' }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e293b';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span>Login</span>
              </button>
            )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="show-mobile-nav"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                background: isMobileMenuOpen ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
                display: 'none', // Shown on mobile via CSS
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#0f172a',
              }}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>✕</span>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              zIndex: 99,
            }}
          >
            {/* Mobile User Profile or Login Trigger */}
            <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', marginBottom: '0.5rem' }}>
              {currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{currentUser.phone || currentUser.email}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link
                      href="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f172a', textDecoration: 'none', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '5px 10px', borderRadius: '8px' }}
                    >
                      Orders
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logoutUser();
                      }}
                      style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ef4444', backgroundColor: '#ffffff', border: '1px solid #fecaca', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (currentAdmin || (pathname && pathname.startsWith('/admin'))) ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{currentAdmin?.name || 'Ganesh Shende'} (Admin)</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{currentAdmin?.email || 'admin@sgwwsp.com'}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleAdminLogout();
                    }}
                    style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ef4444', backgroundColor: '#ffffff', border: '1px solid #fecaca', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '11px',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Login / Register Account</span>
                </button>
              )}
            </div>

            {/* Quick Mobile Track Order by ID */}
            <form
              onSubmit={(e) => handleTrackSubmit(e)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                marginBottom: '0.5rem',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <input
                type="text"
                placeholder="Track Order ID (e.g. SG-2026-...)"
                value={trackOrderId}
                onChange={(e) => setTrackOrderId(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '0.875rem',
                  color: '#0f172a',
                  fontWeight: 500,
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                Track
              </button>
            </form>

            {navLinks.map((item) => {
              const active = isActiveLink(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    padding: '10px 14px',
                    fontSize: '0.95rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? '#000000' : '#334155',
                    backgroundColor: active ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                    textDecoration: 'none',
                    borderRadius: '10px',
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
