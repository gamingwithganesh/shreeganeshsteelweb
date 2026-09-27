'use client';

import React from 'react';
import Link from 'next/link';
import { manualFullReset } from '@/lib/freshArrivalCleaner';

export default function Footer() {
  const googleMapsUrl =
    'https://www.google.com/maps/place/Shri+Ganesh+Welding+Works+shop+Ghatanji/@20.1441888,78.3122625,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd3b9157d1d648b:0x1efbfee1ed30f59e!8m2!3d20.1441838!4d78.3148374!16s%2Fg%2F11gm87w9rv?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D';

  return (
    <footer
      id="site-footer"
      style={{
        backgroundColor: '#ffffff',
        color: '#0f172a',
        padding: 'clamp(3rem, 5vw, 5rem) 0 2rem 0',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* ========================================================
            1. Top Row matching Reference Screenshot:
               'Experience liftoff' on Left + Exactly 2 Columns (Product & Resources) on Right
           ======================================================== */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingBottom: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          {/* Left: Clean Tagline Headline matching screenshot */}
          <div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)',
                fontWeight: 500,
                color: '#111827',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Experience liftoff
            </h2>
          </div>

          {/* Right: Exactly 2 Columns (Product & Resources) matching reference screenshot */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(2.5rem, 6vw, 7.5rem)',
              flexWrap: 'wrap',
            }}
          >
            {/* Column 1: Product */}
            <div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#1f1f1f',
                  letterSpacing: '-0.01em',
                  marginBottom: '1.25rem',
                }}
              >
                Product
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
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
                    Custom Steel Gates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Industrial PEB Sheds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Laser Balustrades
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Rolling Shutters
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Agro Equipment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Browse Catalog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#1f1f1f',
                  letterSpacing: '-0.01em',
                  marginBottom: '1.25rem',
                }}
              >
                Resources
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.875rem',
                }}
              >
                <li>
                  <Link
                    href="/blogs"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Fabrication Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Steel Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Turnkey Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Order Tracker
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    About Workshop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Workshop Desk
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================
            Local SEO Keyword Hub & Regional Service Coverage
           ======================================================== */}
        <div
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
            padding: '2rem 0 1rem',
            marginTop: '1.5rem',
            fontSize: '0.8rem',
            color: '#64748b',
            lineHeight: 1.7,
          }}
        >
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Vidarbha &amp; Maharashtra Fabrication Service Hubs
            </h3>
            <p style={{ margin: 0 }}>
              <strong>Direct Workshop Supply &amp; On-Site Steel Installation in:</strong>{' '}
              <span>Ghatanji</span> • <span>Yavatmal</span> • <span>Pandharkawada (Kelapur)</span> • <span>Nagpur</span> • <span>Wardha</span> • <span>Akola</span> • <span>Amravati</span> • <span>Pusad</span> • <span>Chandrapur</span> • <span>Wani</span> • <span>Hinganghat</span> • <span>Digras</span> • <span>Darwha</span> • <span>Umarkhed</span> • <span>Ralegaon</span> • <span>Arni</span>.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Popular Steel Fabrication &amp; Welding Specializations
            </h3>
            <p style={{ margin: 0 }}>
              <strong>Shree Ganesh Steel and Welding Workshop (Shri Ganesh Welding Works Shop):</strong>{' '}
              Custom CNC Laser Cut Main Gates • Stainless Steel SS 304 Railings • Heavy Industrial PEB Sheds &amp; Warehouses • Commercial Glass &amp; Steel Facades • Agricultural Cultivators, Trolleys &amp; Ploughs • Structural Steel Trusses • Automatic Sliding Gates • Precision Metal Blueprint Fabrication.
            </p>
          </div>
        </div>

        {/* ========================================================
            2. Monumental Giant Wordmark matching Reference Screenshot:
                'Shree Ganesh Steel' spanning full width edge-to-edge
            ======================================================== */}
        <div
          style={{
            padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(1.5rem, 3vw, 2.5rem) 0',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            className="font-display"
            style={{
              fontSize: 'clamp(1.5rem, 6.9vw, 7.35rem)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.045em',
              lineHeight: 0.92,
              whiteSpace: 'nowrap',
              userSelect: 'none',
              textAlign: 'left',
              width: '100%',
              marginLeft: '-2px',
            }}
          >
            Shree Ganesh Steel
          </div>
        </div>

        {/* ========================================================
            3. Bottom Bar matching Reference Screenshot:
               'Shree Ganesh Steel' on Left, About / Products / Privacy / Terms on Right
           ======================================================== */}
        <div
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            paddingTop: 'clamp(1.25rem, 2vw, 1.75rem)',
            paddingBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
            fontSize: '0.8125rem',
            color: '#5f6368',
          }}
        >
          {/* Left: Wordmark Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#202124',
                fontWeight: 600,
                fontSize: '1.125rem',
                letterSpacing: '-0.025em',
              }}
            >
              Shree Ganesh Steel
            </Link>
          </div>

          {/* Right: Meta Links matching Reference Screenshot */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.75rem, 1.8vw, 1.85rem)',
              flexWrap: 'wrap',
              fontSize: '0.8125rem',
              color: '#5f6368',
            }}
          >
            <Link
              href="/about"
              style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
            >
              About Workshop
            </Link>
            <Link
              href="/shop"
              style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
            >
              Steel Products
            </Link>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
            >
              Ghatanji Plant
            </a>
            <Link
              href="/contact"
              style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
            >
              Contact Desk
            </Link>
            <Link
              href="/admin"
              style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
            >
              Admin
            </Link>
            <span style={{ color: '#94a3b8' }}>© {new Date().getFullYear()} SGWWSP</span>

            {/* Subtle diagnostic reset button */}
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
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
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
