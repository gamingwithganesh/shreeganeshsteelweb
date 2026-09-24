'use client';

import React from 'react';
import Link from 'next/link';

export default function EngineeringArtisanSection() {
  return (
    <section
      id="engineering-artisan"
      style={{
        backgroundColor: '#ffffff',
        padding: '6.5rem 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Clean Minimalist Copy matching Antigravity 2.0 */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#6b7280',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              [ 04 // PRECISION FABRICATION &amp; WORKSHOP PROTOCOL // ]
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 3.25rem)',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.15,
                letterSpacing: '-0.035em',
                marginBottom: '1.75rem',
              }}
            >
              Engineering Strength with an Artisan’s Eye.
            </h2>

            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: '#334155',
                marginBottom: '1.25rem',
              }}
            >
              At <strong>Shree Ganesh Steel and Welding Workshop</strong>, we combine decades of heavy metallurgical mastery with clean, contemporary architectural aesthetics.
            </p>

            <p
              style={{
                fontSize: '1.025rem',
                lineHeight: 1.7,
                color: '#64748b',
                marginBottom: '2.5rem',
              }}
            >
              Your command center to configure, engineer, and fabricate precision metalcraft in parallel. Whether designing heavy industrial PEB warehouses or sculpting custom laser-cut gates, our certified master fabricators calibrate every angle directly to 0.5mm laser tolerances.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Link
                href="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  padding: '0.85rem 2rem',
                  borderRadius: '9999px',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(15, 23, 42, 0.15)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e293b';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0f172a';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span>Read Workshop Story</span>
                <span>→</span>
              </Link>

              <Link
                href="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '9999px',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1.5px solid #e2e8f0',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0f172a';
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <span>Browse Catalog</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Antigravity 2.0 Style UI with Ambient Aura & Exact Image */}
          <div style={{ position: 'relative' }}>
            {/* Outer Container with Soft Aura Gradient Glow */}
            <div
              style={{
                borderRadius: '36px',
                background: 'radial-gradient(circle at 65% 25%, rgba(59, 130, 246, 0.22) 0%, rgba(249, 115, 22, 0.14) 35%, rgba(236, 72, 153, 0.12) 65%, transparent 80%), #f8fafc',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                padding: '2.5rem',
                position: 'relative',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Image Container Card */}
              <div
                style={{
                  width: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 18px 40px -10px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  backgroundColor: '#eceff2',
                }}
              >
                <img
                  src="/images/precision_fabrication_protocol.jpg"
                  alt="Precision Steel Fabrication & CNC Laser Welding Workshop"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '24px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
