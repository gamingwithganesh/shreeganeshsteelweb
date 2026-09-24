'use client';

import { useEffect, useState } from 'react';
import { handleFreshArrivalCleanup } from '@/lib/freshArrivalCleaner';

export default function FreshArrivalCleaner() {
  const [cleanedNotice, setCleanedNotice] = useState(false);

  useEffect(() => {
    handleFreshArrivalCleanup().then((didClean) => {
      if (didClean) {
        setCleanedNotice(true);
        const timer = setTimeout(() => setCleanedNotice(false), 3500);
        return () => clearTimeout(timer);
      }
    });
  }, []);

  if (!cleanedNotice) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
        background: 'rgba(15, 23, 42, 0.94)',
        backdropFilter: 'blur(10px)',
        color: '#f8fafc',
        border: '1px solid #38bdf8',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.3)',
        borderRadius: '12px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.85rem',
        fontWeight: 500,
        animation: 'fadeInUp 0.3s ease-out',
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'rgba(56, 189, 248, 0.15)',
          color: '#38bdf8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
      </div>
      <div>
        <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.88rem' }}>
          Fresh Session Initialized
        </div>
        <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
          Browser cookies &amp; cache storage cleared for latest updates
        </div>
      </div>
      <button
        onClick={() => setCleanedNotice(false)}
        style={{
          background: 'none',
          border: 'none',
          color: '#64748b',
          fontSize: '16px',
          cursor: 'pointer',
          padding: '0 4px',
          marginLeft: '4px',
        }}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}
