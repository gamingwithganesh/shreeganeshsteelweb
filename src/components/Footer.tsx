'use client';

import React from 'react';
import Link from 'next/link';
import { manualFullReset } from '@/lib/freshArrivalCleaner';

export default function Footer() {
  const googleMapsUrl =
    'https://www.google.com/maps/place/Shri+Ganesh+Welding+Works+shop+Ghatanji/@20.1441888,78.3122625,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd3b9157d1d648b:0x1efbfee1ed30f59e!8m2!3d20.1441838!4d78.3148374!16s%2Fg%2F11gm87w9rv?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D';

  const hubs = [
    'Ghatanji',
    'Yavatmal',
    'Pandharkawada',
    'Nagpur',
    'Wardha',
    'Akola',
    'Amravati',
    'Pusad',
    'Chandrapur',
    'Wani',
    'Hinganghat',
    'Digras',
    'Darwha',
    'Umarkhed',
    'Ralegaon',
    'Arni',
  ];

  return (
    <footer
      id="site-footer"
      style={{
        backgroundColor: '#ffffff',
        color: '#0f172a',
        padding: 'clamp(3rem, 5vw, 4.5rem) 0 2rem 0',
        borderTop: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* ========================================================
            1. Main Footer Navigation Grid (4 Balanced Columns)
           ======================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(2rem, 3.5vw, 3.5rem)',
            paddingBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
          }}
        >
          {/* Column 1: Brand & Workshop Overview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                }}
              >
                SG
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#09090b',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                Shree Ganesh Steel
              </h2>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              Heavy structural engineering, CNC laser fabrication, architectural metalwork &amp; turnkey industrial PEB sheds.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem', color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#09090b', fontWeight: 600 }}>📍 Plant:</span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#09090b', textDecoration: 'underline' }}
                >
                  Ghatanji, Dist. Yavatmal (MH)
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#09090b', fontWeight: 600 }}>📞 Workshop:</span>
                <a href="tel:+919822463944" style={{ color: '#09090b', textDecoration: 'none' }}>
                  +91 98224 63944
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Steel & Fabrication Products */}
          <div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#09090b',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
              }}
            >
              Products
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.875rem',
              }}
            >
              <li>
                <Link
                  href="/shop"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Custom Laser Cut Gates
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  SS 304 Railings &amp; Balustrades
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Industrial PEB Sheds &amp; Trusses
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Heavy Rolling Shutters
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Agricultural Trolleys &amp; Implements
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Browse Full Catalog →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services & Engineering */}
          <div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#09090b',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
              }}
            >
              Services &amp; Tools
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.875rem',
              }}
            >
              <li>
                <Link
                  href="/services"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Turnkey Factory Fabrication
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Track Project Order Status
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Steel Fabrication Knowledge
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Request On-Site Measurement
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Welding &amp; Quality Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Help & Location Desk */}
          <div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#09090b',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
              }}
            >
              Workshop Hub
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.875rem',
              }}
            >
              <li>
                <Link
                  href="/about"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  About SGWWSP
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Contact &amp; Inquiries
                </Link>
              </li>
              <li>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Get Driving Directions ↗
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                >
                  Staff Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================
            2. Regional Service Coverage & SEO Block
           ======================================================== */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#09090b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                📍 Direct Workshop Supply &amp; On-Site Installation Across Vidarbha
              </h3>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                16 Delivery Hubs in Maharashtra
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {hubs.map((hub) => (
                <span
                  key={hub}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: '#334155',
                  }}
                >
                  {hub}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            3. Monumental Giant Wordmark
           ======================================================== */}
        <div
          style={{
            padding: 'clamp(1rem, 2.5vw, 2rem) 0 clamp(1.25rem, 2.5vw, 2rem) 0',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 7.2vw, 6.75rem)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              whiteSpace: 'nowrap',
              userSelect: 'none',
              textAlign: 'left',
              width: '100%',
            }}
          >
            Shree Ganesh Steel
          </div>
        </div>

        {/* ========================================================
            4. Clean Bottom Bar (Aligned & Responsive)
           ======================================================== */}
        <div
          style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8125rem',
            color: '#64748b',
          }}
        >
          {/* Left: Copyright */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>© {new Date().getFullYear()} Shree Ganesh Steel &amp; Welding Workshop (SGWWSP).</span>
            <span>All rights reserved.</span>
          </div>

          {/* Right: Meta Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/about"
              style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#09090b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              About
            </Link>
            <Link
              href="/shop"
              style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#09090b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              Catalog
            </Link>
            <Link
              href="/services"
              style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#09090b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              Services
            </Link>
            <Link
              href="/contact"
              style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#09090b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              Contact
            </Link>
            <Link
              href="/admin"
              style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#09090b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              Admin
            </Link>

            {/* Quick cache refresh diagnostic button */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Clear all cache and reload fresh?')) {
                  manualFullReset();
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.75rem',
                cursor: 'pointer',
                padding: '2px 4px',
                transition: 'color 0.15s ease',
              }}
              title="Clear cache and reload"
              onMouseEnter={(e) => (e.currentTarget.style.color = '#09090b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              ↻
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
