'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      id="site-footer"
      style={{
        backgroundColor: '#ffffff',
        color: '#111827',
        padding: 'clamp(3.5rem, 5vw, 5rem) 0 clamp(1.5rem, 3vw, 2.5rem) 0',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* ========================================================
            1. Top Row:
               'Experience precision' on Left + Exactly 2 Columns (Product & Resources) on Right
           ======================================================== */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2.5rem',
            paddingBottom: 'clamp(2.5rem, 4vw, 4rem)',
          }}
        >
          {/* Left: Clean Tagline Headline */}
          <div style={{ maxWidth: '400px' }}>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
                fontWeight: 500,
                color: '#111827',
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Experience precision
            </h2>
          </div>

          {/* Right: Exactly 2 Columns (Product & Resources) */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(3rem, 7vw, 7rem)',
              flexWrap: 'wrap',
            }}
          >
            {/* Column 1: Product */}
            <div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#111827',
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
                    Custom Gates
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
                    Full Catalog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#111827',
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
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    Services &amp; Sheds
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
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. Monumental Giant Wordmark (Full Width 'Shree Ganesh Steel')
           ======================================================== */}
        <div
          style={{
            padding: 'clamp(1rem, 3vw, 2.5rem) 0 clamp(1rem, 2.5vw, 2rem) 0',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 7.8vw, 7.6rem)',
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-0.04em',
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
            3. Bottom Bar: Brand on Left, Meta Links on Right
           ======================================================== */}
        <div
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            paddingTop: 'clamp(1.25rem, 2vw, 1.75rem)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
            fontSize: '0.8125rem',
            color: '#5f6368',
          }}
        >
          {/* Left: Brand Name / Logo */}
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

          {/* Right: Meta Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.85rem, 2vw, 2rem)',
              flexWrap: 'wrap',
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
            <Link
              href="/contact"
              style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
            >
              Contact
            </Link>
            <Link
              href="/admin"
              style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
            >
              Admin
            </Link>
            <span style={{ color: '#9ca3af' }}>© {new Date().getFullYear()} SGWWSP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
