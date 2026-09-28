'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const googleMapsUrl =
    'https://www.google.com/maps/place/Shri+Ganesh+Welding+Works+shop+Ghatanji/@20.1441888,78.3122625,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd3b9157d1d648b:0x1efbfee1ed30f59e!8m2!3d20.1441838!4d78.3148374!16s%2Fg%2F11gm87w9rv?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D';

  return (
    <footer
      id="site-footer"
      style={{
        backgroundColor: '#ffffff',
        color: '#0f172a',
        padding: '3rem 0 1.75rem 0',
        borderTop: '1px solid #e2e8f0',
      }}
    >
      <div className="container-custom">
        {/* Simple & Forward 3-Column Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          {/* Column 1: Brand & Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#09090b',
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                }}
              >
                SG
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Shree Ganesh Steel
              </span>
            </Link>

            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Custom structural steel, laser gates, balustrades &amp; industrial PEB sheds.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.825rem', marginTop: '4px' }}>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#475569', textDecoration: 'none' }}
              >
                📍 Main Road, Ghatanji, Dist. Yavatmal
              </a>
              <a href="tel:+919822463944" style={{ color: '#475569', textDecoration: 'none' }}>
                📞 +91 98224 63944
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#09090b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
              Navigation
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: '0.85rem' }}>
              <Link href="/shop" style={{ color: '#64748b', textDecoration: 'none' }}>
                Products
              </Link>
              <Link href="/services" style={{ color: '#64748b', textDecoration: 'none' }}>
                Services
              </Link>
              <Link href="/track-order" style={{ color: '#64748b', textDecoration: 'none' }}>
                Track Order
              </Link>
              <Link href="/blogs" style={{ color: '#64748b', textDecoration: 'none' }}>
                Blogs
              </Link>
              <Link href="/about" style={{ color: '#64748b', textDecoration: 'none' }}>
                About Us
              </Link>
              <Link href="/contact" style={{ color: '#64748b', textDecoration: 'none' }}>
                Contact
              </Link>
            </div>
          </div>

          {/* Column 3: Hours & Support */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#09090b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
              Workshop Hours
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
              Monday – Saturday: 8:00 AM – 8:30 PM<br />
              Sunday: 9:00 AM – 2:00 PM
            </p>
            <div style={{ marginTop: '12px' }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Request Quote →
              </Link>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div
          style={{
            paddingTop: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.78rem',
            color: '#94a3b8',
          }}
        >
          <div>
            © {new Date().getFullYear()} Shree Ganesh Steel &amp; Welding Workshop.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/about" style={{ color: '#64748b', textDecoration: 'none' }}>
              About
            </Link>
            <Link href="/contact" style={{ color: '#64748b', textDecoration: 'none' }}>
              Support
            </Link>
            <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none' }}>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
