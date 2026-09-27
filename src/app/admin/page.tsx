'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminProvider } from '@/context/AdminContext';
import AdminGuard from '@/components/admin/AdminGuard';
import { AdminTab } from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import OverviewDashboardTab from '@/components/admin/OverviewDashboardTab';
import ProductsTab from '@/components/admin/ProductsTab';
import OrdersTab from '@/components/admin/OrdersTab';
import SettingsTab from '@/components/admin/SettingsTab';
import MaintenanceTab from '@/components/admin/MaintenanceTab';
import AnalyticsTab from '@/components/admin/AnalyticsTab';

import { useAdmin } from '@/context/AdminContext';

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const { toastNotification, showToastNotification } = useAdmin();

  return (
    <div style={{ padding: '1.5rem 0 4rem', backgroundColor: '#fafafa', minHeight: 'calc(100vh - 76px)', position: 'relative' }}>
      {/* Global Floating Toast Notification - Monochrome High Contrast */}
      {toastNotification && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '12px 18px',
            borderRadius: '12px',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            maxWidth: '420px',
            border: '1px solid #27272a',
          }}
        >
          <span style={{ fontSize: '1rem' }}>
            {toastNotification.type === 'error' ? '●' : '✓'}
          </span>
          <span style={{ flex: 1 }}>{toastNotification.message}</span>
          <button
            type="button"
            onClick={() => showToastNotification('')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#a1a1aa',
              cursor: 'pointer',
              fontSize: '1rem',
              padding: '0 4px',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      )}

      <div className="container-custom" style={{ maxWidth: '1440px', padding: '0 12px' }}>
        <div className="admin-layout-wrapper">
          {/* Left Dark Sidebar Card (Desktop) + Mobile Topbar (Tablet & Mobile) */}
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Right Main Content Area */}
          <main className="admin-main-content">
            {activeTab === 'overview' && (
              <OverviewDashboardTab onNavigateTab={(tab) => setActiveTab(tab)} />
            )}
            {activeTab === 'products' && <ProductsTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'settings' && <SettingsTab />}
            {activeTab === 'maintenance' && <MaintenanceTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminProvider>
      <AdminGuard>
        <AdminDashboardContent />
      </AdminGuard>
    </AdminProvider>
  );
}
