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
        padding: 'clamp(3.5rem, 6vw, 5.5rem) 0 clamp(1.75rem, 3vw, 2.5rem) 0',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3.5rem)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* ========================================================
            1. Top Section: 'Experience liftoff' on Left, Columns on Right
           ======================================================== */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2.5rem',
            paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          }}
        >
          {/* Left: Headline Text */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2.5vw, 2.35rem)',
                fontWeight: 400,
                color: '#111827',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Experience liftoff
            </h2>
          </div>

          {/* Right: Exactly 2 Columns (Product & Resources) */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(3.5rem, 7vw, 7.5rem)',
              flexWrap: 'wrap',
            }}
          >
            {/* Column 1: Product */}
            <div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: '#111827',
                  letterSpacing: '-0.01em',
                  marginBottom: '1.15rem',
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
                  gap: '0.625rem',
                  fontSize: '0.8125rem',
                }}
              >
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    Custom Gates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    PEB Sheds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    Laser Balustrades
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    Rolling Shutters
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    Agro Equipment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    All Products
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: '#111827',
                  letterSpacing: '-0.01em',
                  marginBottom: '1.15rem',
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
                  gap: '0.625rem',
                  fontSize: '0.8125rem',
                }}
              >
                <li>
                  <Link
                    href="/blogs"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    Services &amp; Sheds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    Order Tracker
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    About Workshop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    style={{ color: '#5f6368', textDecoration: 'none', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5f6368')}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. Monumental Giant Wordmark: Full Width Edge-to-Edge
           ======================================================== */}
        <div
          style={{
            padding: 'clamp(1rem, 2.5vw, 2.5rem) 0 clamp(1.25rem, 3vw, 2.5rem) 0',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(2.5rem, 8.8vw, 8.8rem)',
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
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
            paddingTop: '1.35rem',
            paddingBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
            fontSize: '0.78rem',
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
              fontSize: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Shree Ganesh Steel
          </Link>

          {/* Right: Meta Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1rem, 2vw, 2.25rem)',
              flexWrap: 'wrap',
              fontSize: '0.78rem',
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
