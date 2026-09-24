'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { AdminTab } from './AdminHeader';
import ConfirmWipeModal from './ConfirmWipeModal';

interface OverviewDashboardProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export default function OverviewDashboardTab({ onNavigateTab }: OverviewDashboardProps) {
  const { orders, products, wipeAllAppData, seedSampleData, triggerTestNotification } = useAdmin();
  const [isWipeModalOpen, setIsWipeModalOpen] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  const handleConfirmWipe = async () => {
    setIsWiping(true);
    await wipeAllAppData();
    setIsWiping(false);
    setIsWipeModalOpen(false);
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Dynamic calculations based strictly on real orders
  const totalRevenue = orders.reduce((sum, o) => {
    const amt = typeof o.amount === 'number' ? o.amount : (o as any).grandTotal || parseFloat(String(o.amount || 0).replace(/[^0-9.]/g, '')) || 0;
    return sum + amt;
  }, 0);

  const totalAdvanceCollected = orders.reduce((sum, o) => {
    const adv = typeof o.advancePaid === 'number' ? o.advancePaid : (o as any).advancePaid || 0;
    return sum + adv;
  }, 0);

  const totalBalanceDue = orders.reduce((sum, o) => {
    const bal = typeof o.balanceDue === 'number' ? o.balanceDue : (o as any).balanceDue || 0;
    return sum + bal;
  }, 0);

  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const inProgressCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Minimal Header Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e4e4e7',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#09090b',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Overview
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.8rem', margin: '2px 0 0 0' }}>
            Store &amp; workshop summary
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => triggerTestNotification()}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e4e4e7',
              color: '#09090b',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
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
            onClick={() => seedSampleData()}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e4e4e7',
              color: '#09090b',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
            <span>Load Demo</span>
          </button>

          <button
            type="button"
            onClick={() => setIsWipeModalOpen(true)}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e4e4e7',
              color: '#dc2626',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmWipeModal
        isOpen={isWipeModalOpen}
        onClose={() => setIsWipeModalOpen(false)}
        onConfirm={handleConfirmWipe}
        isProcessing={isWiping}
      />

      {/* 2. Monochrome KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Card 1: TOTAL SALES REVENUE */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e4e4e7',
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                TOTAL SALES REVENUE
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#f4f4f5',
                  color: '#09090b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>

            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#09090b', margin: '12px 0 4px', letterSpacing: '-0.02em' }}>
              {formatINR(totalRevenue)}
            </div>
          </div>

          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f4f4f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
            <span style={{ color: '#09090b', fontWeight: 600 }}>
              Adv: {formatINR(totalAdvanceCollected)}
            </span>
            <span style={{ color: totalBalanceDue > 0 ? '#b91c1c' : '#71717a', fontWeight: 600 }}>
              Due: {formatINR(totalBalanceDue)}
            </span>
          </div>
        </div>

        {/* Card 2: WORKSHOP ORDERS */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e4e4e7',
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                TOTAL ORDERS
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#f4f4f5',
                  color: '#09090b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
            </div>

            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#09090b', margin: '12px 0 4px', letterSpacing: '-0.02em' }}>
              {orders.length}
            </div>
          </div>

          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f4f4f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
            <span style={{ color: '#09090b', fontWeight: 600 }}>
              {deliveredCount} Delivered
            </span>
            <span style={{ color: '#71717a', fontWeight: 600 }}>
              {inProgressCount} Active
            </span>
          </div>
        </div>

        {/* Card 3: INVENTORY ITEMS */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e4e4e7',
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                CATALOG PRODUCTS
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#f4f4f5',
                  color: '#09090b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                </svg>
              </div>
            </div>

            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#09090b', margin: '12px 0 4px', letterSpacing: '-0.02em' }}>
              {products.length}
            </div>
          </div>

          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f4f4f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
            <span style={{ color: '#09090b', fontWeight: 600 }}>
              Live in Store
            </span>
            <span style={{ color: '#71717a' }}>
              Fabrication Items
            </span>
          </div>
        </div>
      </div>

      {/* 3. Recent Orders Minimal Table */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e4e4e7',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e4e4e7',
          }}
        >
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#09090b', margin: 0 }}>
            Recent Orders
          </h2>

          <button
            type="button"
            onClick={() => onNavigateTab('orders')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#09090b',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>View All</span>
            <span>→</span>
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '680px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e4e4e7' }}>
                <th style={{ padding: '10px 18px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  ORDER
                </th>
                <th style={{ padding: '10px 14px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  CLIENT
                </th>
                <th style={{ padding: '10px 14px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  CATEGORY
                </th>
                <th style={{ padding: '10px 14px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  AMOUNT
                </th>
                <th style={{ padding: '10px 18px', fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px 18px', textAlign: 'center', color: '#71717a', fontSize: '0.825rem' }}>
                    No orders yet.
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    style={{
                      borderBottom: '1px solid #f4f4f5',
                    }}
                  >
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{ color: '#09090b', fontWeight: 700, fontSize: '0.825rem', fontFamily: 'monospace' }}>
                        {order.orderNumber}
                      </span>
                    </td>

                    <td style={{ padding: '12px 14px', fontWeight: 600, color: '#09090b', fontSize: '0.825rem' }}>
                      {order.clientName || order.clientEmail || 'Client'}
                    </td>

                    <td style={{ padding: '12px 14px', color: '#52525b', fontSize: '0.8rem' }}>
                      {order.serviceCategory || 'Fabrication'}
                    </td>

                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#09090b', fontSize: '0.825rem' }}>
                      ₹{(typeof order.amount === 'number' ? order.amount : (order as any).grandTotal || 0).toLocaleString('en-IN')}
                    </td>

                    <td style={{ padding: '12px 18px' }}>
                      <span
                        style={{
                          backgroundColor: order.status === 'delivered' ? '#f4f4f5' : order.status === 'ready_dispatch' ? '#ffffff' : '#000000',
                          color: order.status === 'delivered' ? '#52525b' : order.status === 'ready_dispatch' ? '#09090b' : '#ffffff',
                          border: order.status === 'ready_dispatch' ? '1px solid #e4e4e7' : 'none',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
