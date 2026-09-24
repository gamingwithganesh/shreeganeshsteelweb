'use client';

import React from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';
import {
  ThreeDFactory,
  ThreeDClipboard,
  ThreeDShield,
  ThreeDClock,
} from '@/components/ThreeDIcons';

export type AdminTab = 'overview' | 'products' | 'orders' | 'settings' | 'maintenance' | 'analytics';

interface AdminHeaderProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

export default function AdminHeader({ activeTab, setActiveTab }: AdminHeaderProps) {
  const { orders, products, stats, currentAdmin, seedSampleData, clearAllStoreData, logout } = useAdmin();

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #cce7f5',
        boxShadow: '0 10px 30px -10px rgba(56, 158, 211, 0.12)',
        padding: '1.75rem 2rem',
        marginBottom: '2rem',
      }}
    >
      {/* Top operational bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #1d6796, #0f172a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 18px -4px rgba(29, 103, 150, 0.35)',
              color: '#ffffff',
              fontSize: '1.5rem',
            }}
          >
            <ThreeDFactory size={32} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h1
                className="font-display"
                style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: 0 }}
              >
                Workshop Operations &amp; Store Admin
              </h1>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#1d6796',
                  backgroundColor: '#e5f3fa',
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Store Admin
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#15803d',
                  backgroundColor: '#dcfce7',
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#16a34a',
                  }}
                />
                Facility Active
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.825rem', color: '#64748b', marginTop: '2px' }}>
              Shree Ganesh Steel &amp; Welding Workshop • Logged in as: <strong>{currentAdmin?.name || 'Rameshwar Patil'}</strong> ({currentAdmin?.email || 'admin@sgwwsp.com'})
            </p>
          </div>
        </div>

        {/* Action Controls & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>

          <button
            type="button"
            onClick={() => {
              if (confirm('Populate workshop sample products, orders, and demo machinery records?')) {
                seedSampleData();
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              padding: '0.55rem 0.95rem',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#166534',
              cursor: 'pointer',
            }}
            title="Populate demo workshop products, machinery, and fabrication orders"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
            Seed Sample Data
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('WARNING: Clear all store products and orders to start with a clean slate?')) {
                clearAllStoreData();
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              padding: '0.55rem 0.95rem',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#dc2626',
              cursor: 'pointer',
            }}
            title="Wipe store catalog and orders"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Clear Store Data
          </button>

          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.55rem 0.95rem',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#334155',
              fontSize: '0.8rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>View Storefront</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            style={{
              background: '#0f172a',
              border: 'none',
              padding: '0.55rem 1rem',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingTop: '1.25rem',
          scrollbarWidth: 'none',
        }}
      >
        {/* Tab 1: Overview */}
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.65rem 1.25rem',
            borderRadius: '12px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: activeTab === 'overview' ? '1px solid #2380b8' : '1px solid transparent',
            backgroundColor: activeTab === 'overview' ? '#eef7fc' : '#f8fbfd',
            color: activeTab === 'overview' ? '#1d6796' : '#475569',
            boxShadow: activeTab === 'overview' ? '0 4px 14px -3px rgba(35, 128, 184, 0.2)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span>Overview</span>
        </button>

        {/* Tab 2: Products Catalog */}
        <button
          onClick={() => setActiveTab('products')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.65rem 1.25rem',
            borderRadius: '12px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: activeTab === 'products' ? '1px solid #2380b8' : '1px solid transparent',
            backgroundColor: activeTab === 'products' ? '#eef7fc' : '#f8fbfd',
            color: activeTab === 'products' ? '#1d6796' : '#475569',
            boxShadow: activeTab === 'products' ? '0 4px 14px -3px rgba(35, 128, 184, 0.2)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span>Products ({products.length})</span>
        </button>

        {/* Tab 3: Orders */}
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.65rem 1.25rem',
            borderRadius: '12px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: activeTab === 'orders' ? '1px solid #2380b8' : '1px solid transparent',
            backgroundColor: activeTab === 'orders' ? '#eef7fc' : '#f8fbfd',
            color: activeTab === 'orders' ? '#1d6796' : '#475569',
            boxShadow: activeTab === 'orders' ? '0 4px 14px -3px rgba(35, 128, 184, 0.2)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <ThreeDClipboard size={18} />
          <span>Orders</span>
          <span
            style={{
              backgroundColor: activeTab === 'orders' ? '#2380b8' : '#e2e8f0',
              color: activeTab === 'orders' ? '#ffffff' : '#334155',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '2px 7px',
              borderRadius: '9999px',
            }}
          >
            {orders.length}
          </span>
        </button>

        {/* Tab 4: Promotional Settings */}
        <button
          onClick={() => setActiveTab('settings')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.65rem 1.25rem',
            borderRadius: '12px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: activeTab === 'settings' ? '1px solid #2380b8' : '1px solid transparent',
            backgroundColor: activeTab === 'settings' ? '#eef7fc' : '#f8fbfd',
            color: activeTab === 'settings' ? '#1d6796' : '#475569',
            boxShadow: activeTab === 'settings' ? '0 4px 14px -3px rgba(35, 128, 184, 0.2)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13.5" cy="6.5" r=".5" />
            <circle cx="17.5" cy="10.5" r=".5" />
            <circle cx="8.5" cy="7.5" r=".5" />
            <circle cx="6.5" cy="12.5" r=".5" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
          </svg>
          <span>Promotions &amp; Hero</span>
        </button>

        {/* Tab 5: Machinery & Maintenance */}
        <button
          onClick={() => setActiveTab('maintenance')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.65rem 1.25rem',
            borderRadius: '12px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: activeTab === 'maintenance' ? '1px solid #2380b8' : '1px solid transparent',
            backgroundColor: activeTab === 'maintenance' ? '#eef7fc' : '#f8fbfd',
            color: activeTab === 'maintenance' ? '#1d6796' : '#475569',
            boxShadow: activeTab === 'maintenance' ? '0 4px 14px -3px rgba(35, 128, 184, 0.2)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <ThreeDShield size={18} />
          <span>Machinery &amp; Fleet</span>
          {stats.maintenanceAlertsCount > 0 && (
            <span
              style={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '9999px',
              }}
            >
              {stats.maintenanceAlertsCount} Due
            </span>
          )}
        </button>

        {/* Tab 6: Analytics */}
        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.65rem 1.25rem',
            borderRadius: '12px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: activeTab === 'analytics' ? '1px solid #2380b8' : '1px solid transparent',
            backgroundColor: activeTab === 'analytics' ? '#eef7fc' : '#f8fbfd',
            color: activeTab === 'analytics' ? '#1d6796' : '#475569',
            boxShadow: activeTab === 'analytics' ? '0 4px 14px -3px rgba(35, 128, 184, 0.2)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <ThreeDClock size={18} />
          <span>Analytics</span>
        </button>
      </div>
    </div>
  );
}
