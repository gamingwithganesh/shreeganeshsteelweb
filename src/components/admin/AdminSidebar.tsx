'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';
import { AdminTab } from './AdminHeader';
import ConfirmWipeModal from './ConfirmWipeModal';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const { logout, orders, products, wipeAllAppData, triggerTestNotification } = useAdmin();
  const [isWipeModalOpen, setIsWipeModalOpen] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  const handleConfirmWipe = async () => {
    setIsWiping(true);
    await wipeAllAppData();
    setIsWiping(false);
    setIsWipeModalOpen(false);
  };

  const navItems: Array<{
    id: AdminTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }> = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      id: 'products',
      label: 'Products',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      badge: products.length,
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      badge: orders.length,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* 1. Desktop Sidebar (Screens > 1024px) */}
      <aside className="admin-sidebar-desktop">
        {/* Clean Monochrome Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '2px 6px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontWeight: 900,
              fontSize: '0.85rem',
              letterSpacing: '-0.02em',
            }}
          >
            SG
          </div>

          <div>
            <div
              style={{
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Admin Panel
            </div>
            <div
              style={{
                color: '#71717a',
                fontSize: '0.68rem',
                fontWeight: 500,
                marginTop: '1px',
              }}
            >
              Workshop Control
            </div>
          </div>
        </div>

        {/* 2. Nav Menu Items */}
        <nav
          style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: 1,
          }}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#000000' : '#a1a1aa',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#18181b';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#a1a1aa';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: isActive ? '#000000' : '#a1a1aa', display: 'flex' }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontSize: '0.825rem',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {item.label}
                  </span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    style={{
                      backgroundColor: isActive ? '#000000' : '#27272a',
                      color: isActive ? '#ffffff' : '#e4e4e7',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '9999px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* 3. Bottom Links */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid #27272a',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <button
            type="button"
            onClick={() => triggerTestNotification()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              borderRadius: '8px',
              background: 'transparent',
              border: '1px solid #27272a',
              color: '#d4d4d8',
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#18181b';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#d4d4d8';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span>Test Alert</span>
          </button>

          <button
            type="button"
            onClick={() => setIsWipeModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              borderRadius: '8px',
              background: 'transparent',
              border: '1px solid #27272a',
              color: '#a1a1aa',
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#18181b';
              e.currentTarget.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#a1a1aa';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Reset Data</span>
          </button>

          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              borderRadius: '8px',
              color: '#a1a1aa',
              fontSize: '0.78rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#18181b';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#a1a1aa';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Storefront</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              borderRadius: '8px',
              background: 'transparent',
              border: 'none',
              color: '#71717a',
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#71717a')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. Tablet & Mobile Responsive Top Navigation Bar (Screens <= 1024px) */}
      <div className="admin-topbar-mobile">
        {/* Header row: Brand + Quick Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '12px',
            borderBottom: '1px solid #27272a',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          {/* Logo & Brand Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.825rem',
                flexShrink: 0,
              }}
            >
              SG
            </div>
            <div>
              <div style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                Admin Panel
              </div>
              <div style={{ color: '#71717a', fontSize: '0.65rem', fontWeight: 500 }}>
                Workshop Control
              </div>
            </div>
          </div>

          {/* Quick Actions (Test Alert, Reset Data, Storefront, Logout) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => triggerTestNotification()}
              title="Test Push Notification"
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                color: '#d4d4d8',
                fontSize: '0.74rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span>Alert</span>
            </button>

            <button
              type="button"
              onClick={() => setIsWipeModalOpen(true)}
              title="Reset All Data"
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                color: '#ef4444',
                fontSize: '0.74rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>Reset</span>
            </button>

            <Link
              href="/"
              title="View Storefront"
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                color: '#a1a1aa',
                fontSize: '0.74rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                textDecoration: 'none',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Store</span>
            </Link>

            <button
              type="button"
              onClick={logout}
              title="Logout"
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                color: '#71717a',
                fontSize: '0.74rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Tab Pills for Mobile & iPad */}
        <div className="admin-tab-scroll" style={{ marginTop: '10px' }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 15px',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid #ffffff' : '1px solid #27272a',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                  backgroundColor: isActive ? '#ffffff' : '#18181b',
                  color: isActive ? '#000000' : '#d4d4d8',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                <span style={{ display: 'flex', color: isActive ? '#000000' : '#a1a1aa' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    style={{
                      backgroundColor: isActive ? '#000000' : '#27272a',
                      color: isActive ? '#ffffff' : '#e4e4e7',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '9999px',
                      marginLeft: '2px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmWipeModal
        isOpen={isWipeModalOpen}
        onClose={() => setIsWipeModalOpen(false)}
        onConfirm={handleConfirmWipe}
        isProcessing={isWiping}
      />
    </>
  );
}
