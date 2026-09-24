'use client';

import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import {
  ThreeDFactory,
  ThreeDClock,
  ThreeDShield,
  ThreeDStar,
  ThreeDGate,
  ThreeDRailing,
  ThreeDStructural,
  ThreeDLaser,
  ThreeDFurniture,
  ThreeDBolt,
} from '@/components/ThreeDIcons';

export default function AnalyticsTab() {
  const { stats, orders, machines } = useAdmin();

  // Helper to format currency
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getCategoryIcon = (catName: string) => {
    const lower = catName.toLowerCase();
    if (lower.includes('gate')) return <ThreeDGate size={22} />;
    if (lower.includes('railing') || lower.includes('balustrade')) return <ThreeDRailing size={22} />;
    if (lower.includes('structural') || lower.includes('shed')) return <ThreeDStructural size={22} />;
    if (lower.includes('laser')) return <ThreeDLaser size={22} />;
    if (lower.includes('furniture')) return <ThreeDFurniture size={22} />;
    return <ThreeDBolt size={22} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* KPI Cards Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Card 1: Total Pipeline Revenue */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '1.75rem',
            borderRadius: '18px',
            border: '1px solid #cce7f5',
            boxShadow: '0 8px 24px -8px rgba(56, 158, 211, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Fabrication Pipeline
            </span>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#e5f3fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ThreeDFactory size={24} />
            </div>
          </div>
          <div>
            <div className="font-display" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
              {formatINR(stats.totalRevenue)}
            </div>
            <div style={{ fontSize: '0.825rem', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>↑ 18.4%</span>
              <span style={{ color: '#64748b', fontWeight: 400 }}>vs previous 30 days</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Floor Jobs */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '1.75rem',
            borderRadius: '18px',
            border: '1px solid #cce7f5',
            boxShadow: '0 8px 24px -8px rgba(56, 158, 211, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Floor Jobs
            </span>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#e5f3fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ThreeDClock size={24} />
            </div>
          </div>
          <div>
            <div className="font-display" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
              {stats.activeOrdersCount} <span style={{ fontSize: '1rem', fontWeight: 600, color: '#64748b' }}>/ {orders.length} total</span>
            </div>
            <div style={{ fontSize: '0.825rem', color: '#2380b8', fontWeight: 600 }}>
              {orders.filter((o) => o.priority === 'urgent').length} marked as High Priority
            </div>
          </div>
        </div>

        {/* Card 3: Machine Health & Uptime */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '1.75rem',
            borderRadius: '18px',
            border: '1px solid #cce7f5',
            boxShadow: '0 8px 24px -8px rgba(56, 158, 211, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Equipment Health Index
            </span>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#e5f3fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ThreeDShield size={24} />
            </div>
          </div>
          <div>
            <div className="font-display" style={{ fontSize: '1.9rem', fontWeight: 800, color: stats.machineHealthScore > 90 ? '#0f172a' : '#d97706', marginBottom: '0.25rem' }}>
              {stats.machineHealthScore}%
            </div>
            <div style={{ fontSize: '0.825rem', color: stats.maintenanceAlertsCount > 0 ? '#ea580c' : '#16a34a', fontWeight: 600 }}>
              {stats.maintenanceAlertsCount > 0
                ? `${stats.maintenanceAlertsCount} machine service scheduled/due`
                : 'All workshop rigs optimal'}
            </div>
          </div>
        </div>

        {/* Card 4: Estimation Conversion */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '1.75rem',
            borderRadius: '18px',
            border: '1px solid #cce7f5',
            boxShadow: '0 8px 24px -8px rgba(56, 158, 211, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Conversion &amp; QC Rating
            </span>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#e5f3fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ThreeDStar size={24} />
            </div>
          </div>
          <div>
            <div className="font-display" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
              {stats.conversionRate}% <span style={{ fontSize: '1rem', fontWeight: 600, color: '#64748b' }}>• 4.9★</span>
            </div>
            <div style={{ fontSize: '0.825rem', color: '#16a34a', fontWeight: 600 }}>
              99.2% Zero-defect dimensional inspection
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Category Breakdown & Status Funnel */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* Left: Fabrication Volume by Category */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid #cce7f5',
            boxShadow: '0 10px 28px -10px rgba(56, 158, 211, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Volume by Fabrication Category
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
              {stats.categoryBreakdown.length} Sectors Active
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {stats.categoryBreakdown.map((item, idx) => {
              const pct = stats.totalRevenue > 0 ? Math.round((item.totalValue / stats.totalRevenue) * 100) : 0;
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getCategoryIcon(item.category)}
                      <span style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0f172a' }}>
                        {item.category}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1d6796' }}>
                        {formatINR(item.totalValue)}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '6px' }}>
                        ({item.count} orders • {pct}%)
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div
                    style={{
                      height: '8px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        borderRadius: '9999px',
                        background: 'linear-gradient(90deg, #68bae2, #1d6796)',
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Fabrication Stage Pipeline */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid #cce7f5',
            boxShadow: '0 10px 28px -10px rgba(56, 158, 211, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Fabrication Stage Pipeline
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#2380b8', fontWeight: 600 }}>
              Real-time Flow
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stats.statusBreakdown.map((item, idx) => {
              const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
                pending: { bg: '#fef3c7', text: '#92400e', dot: '#d97706' },
                material_procured: { bg: '#e0f2fe', text: '#0369a1', dot: '#0284c7' },
                in_fabrication: { bg: '#dbeafe', text: '#1e40af', dot: '#2563eb' },
                qc_inspection: { bg: '#fae8ff', text: '#86198f', dot: '#c026d3' },
                ready_dispatch: { bg: '#f0fdf4', text: '#166534', dot: '#16a34a' },
                delivered: { bg: '#f1f5f9', text: '#475569', dot: '#64748b' },
              };

              const colors = statusColors[item.status] || { bg: '#f1f5f9', text: '#334155', dot: '#64748b' };

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1.15rem',
                    borderRadius: '12px',
                    backgroundColor: colors.bg,
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: colors.dot,
                      }}
                    />
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: colors.text }}>
                      {item.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      color: colors.text,
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      padding: '2px 10px',
                      borderRadius: '9999px',
                    }}
                  >
                    {item.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Real-time Workshop Floor Feed */}
      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid #334155',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#68bae2', margin: 0 }}>
              Workshop Floor Live Activity Log
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', marginTop: '3px' }}>
              Timestamped fabrication milestones and equipment telemetry events
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                animation: 'pulse 2s infinite',
              }}
            />
            <span style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600 }}>Sync Active</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.875rem', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#68bae2', fontFamily: 'monospace', fontWeight: 700 }}>21:42</span>
            <span style={{ color: '#cbd5e1' }}>
              <strong>SG-2026-091</strong> (Precision Engineering Hub): 120 custom flange profiles cut successfully on 3kW CNC Fiber Laser. Shift lead verified tolerance at ±0.08mm.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.875rem', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#68bae2', fontFamily: 'monospace', fontWeight: 700 }}>18:15</span>
            <span style={{ color: '#cbd5e1' }}>
              <strong>SG-2026-090</strong> (Dr. Anita Joshi SS Balustrade): Argon TIG welds passed dye-penetrant surface inspection without porosity.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.875rem', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: '#f59e0b', fontFamily: 'monospace', fontWeight: 700 }}>14:30</span>
            <span style={{ color: '#cbd5e1' }}>
              <strong>Maintenance Alert</strong>: 160-Ton Hydraulic Press Brake reached 3,400 run hours. Scheduled routine ISO VG 68 oil replacement technician visit for tomorrow.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.875rem', padding: '8px 0' }}>
            <span style={{ color: '#22c55e', fontFamily: 'monospace', fontWeight: 700 }}>11:00</span>
            <span style={{ color: '#cbd5e1' }}>
              <strong>SG-2026-094</strong> (Shree Sai Logistics Park): Mobile truck returned from on-site loading bay beam emergency repair. Job closed &amp; signed off.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
