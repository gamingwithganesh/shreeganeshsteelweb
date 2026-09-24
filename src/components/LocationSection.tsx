'use client';

import React, { useState, useId } from 'react';
import { ThreeDMapPin, ThreeDClock, ThreeDPhone, ThreeDFactory, ThreeDShield } from '@/components/ThreeDIcons';
import { ModernLocationPin } from '@/components/Icons';

// Deterministic constellation dots generator to avoid SSR hydration mismatch
const GENERATED_DOTS = [
  { x: 35, y: 45, r: 1.2, opacity: 0.35 },
  { x: 85, y: 120, r: 1.5, opacity: 0.28 },
  { x: 120, y: 80, r: 1.0, opacity: 0.3 },
  { x: 160, y: 210, r: 1.6, opacity: 0.25 },
  { x: 210, y: 140, r: 1.1, opacity: 0.32 },
  { x: 260, y: 90, r: 1.3, opacity: 0.22 },
  { x: 310, y: 250, r: 1.4, opacity: 0.3 },
  { x: 70, y: 320, r: 1.1, opacity: 0.25 },
  { x: 140, y: 410, r: 1.5, opacity: 0.35 },
  { x: 190, y: 350, r: 1.2, opacity: 0.2 },
  { x: 240, y: 480, r: 1.6, opacity: 0.32 },
  { x: 290, y: 420, r: 1.0, opacity: 0.28 },
  { x: 340, y: 530, r: 1.4, opacity: 0.24 },
  { x: 420, y: 70, r: 1.3, opacity: 0.3 },
  { x: 470, y: 160, r: 1.1, opacity: 0.25 },
  { x: 520, y: 110, r: 1.5, opacity: 0.35 },
  { x: 580, y: 230, r: 1.2, opacity: 0.2 },
  { x: 630, y: 150, r: 1.4, opacity: 0.28 },
  { x: 680, y: 80, r: 1.1, opacity: 0.32 },
  { x: 430, y: 380, r: 1.5, opacity: 0.26 },
  { x: 490, y: 460, r: 1.2, opacity: 0.33 },
  { x: 550, y: 390, r: 1.4, opacity: 0.22 },
  { x: 610, y: 510, r: 1.1, opacity: 0.3 },
  { x: 660, y: 440, r: 1.6, opacity: 0.35 },
  { x: 720, y: 520, r: 1.3, opacity: 0.28 },
  { x: 1120, y: 90, r: 1.5, opacity: 0.3 },
  { x: 1160, y: 190, r: 1.1, opacity: 0.25 },
  { x: 1130, y: 340, r: 1.4, opacity: 0.28 },
  { x: 1170, y: 460, r: 1.2, opacity: 0.32 },
  { x: 1080, y: 530, r: 1.6, opacity: 0.26 },
  { x: 50, y: 560, r: 1.3, opacity: 0.28 },
  { x: 380, y: 310, r: 1.0, opacity: 0.2 },
  { x: 90, y: 200, r: 1.4, opacity: 0.3 },
];

// Orbital Rings Center and Geometry for the Right Pillar
const ORBITAL_RINGS = [
  { cx: 900, cy: 120, rOuter: 54, rInner: 30 },
  { cx: 1045, cy: 205, rOuter: 54, rInner: 30 },
  { cx: 1045, cy: 375, rOuter: 54, rInner: 30 },
  { cx: 900, cy: 460, rOuter: 54, rInner: 30 },
  { cx: 755, cy: 375, rOuter: 54, rInner: 30 },
  { cx: 755, cy: 205, rOuter: 54, rInner: 30 },
];

// Particle dots scattered along each orbital ring perimeter
const RING_PARTICLES = [
  // Ring 0 (Top)
  { cx: 900, cy: 66, r: 1.8, fill: '#3b82f6' },
  { cx: 938, cy: 82, r: 1.5, fill: '#60a5fa' },
  { cx: 954, cy: 120, r: 2.0, fill: '#2563eb' },
  { cx: 938, cy: 158, r: 1.4, fill: '#ef4444' },
  { cx: 900, cy: 174, r: 1.7, fill: '#3b82f6' },
  { cx: 862, cy: 158, r: 1.6, fill: '#60a5fa' },
  { cx: 846, cy: 120, r: 2.0, fill: '#1d4ed8' },
  { cx: 862, cy: 82, r: 1.5, fill: '#3b82f6' },

  // Ring 1 (Top-Right)
  { cx: 1045, cy: 151, r: 1.8, fill: '#2563eb' },
  { cx: 1083, cy: 167, r: 1.4, fill: '#60a5fa' },
  { cx: 1099, cy: 205, r: 2.0, fill: '#3b82f6' },
  { cx: 1083, cy: 243, r: 1.5, fill: '#ef4444' },
  { cx: 1045, cy: 259, r: 1.7, fill: '#2563eb' },
  { cx: 1007, cy: 243, r: 1.6, fill: '#60a5fa' },
  { cx: 991, cy: 205, r: 1.9, fill: '#1d4ed8' },

  // Ring 2 (Bottom-Right)
  { cx: 1045, cy: 321, r: 1.8, fill: '#3b82f6' },
  { cx: 1083, cy: 337, r: 1.5, fill: '#60a5fa' },
  { cx: 1099, cy: 375, r: 2.1, fill: '#2563eb' },
  { cx: 1083, cy: 413, r: 1.4, fill: '#3b82f6' },
  { cx: 1045, cy: 429, r: 1.9, fill: '#1d4ed8' },
  { cx: 1007, cy: 413, r: 1.6, fill: '#60a5fa' },
  { cx: 991, cy: 375, r: 1.7, fill: '#ef4444' },

  // Ring 3 (Bottom)
  { cx: 900, cy: 406, r: 1.8, fill: '#2563eb' },
  { cx: 938, cy: 422, r: 1.5, fill: '#60a5fa' },
  { cx: 954, cy: 460, r: 2.0, fill: '#3b82f6' },
  { cx: 938, cy: 498, r: 1.6, fill: '#1d4ed8' },
  { cx: 900, cy: 514, r: 1.9, fill: '#3b82f6' },
  { cx: 862, cy: 498, r: 1.5, fill: '#60a5fa' },
  { cx: 846, cy: 460, r: 1.8, fill: '#ef4444' },

  // Ring 4 (Bottom-Left)
  { cx: 755, cy: 321, r: 1.9, fill: '#3b82f6' },
  { cx: 793, cy: 337, r: 1.5, fill: '#60a5fa' },
  { cx: 809, cy: 375, r: 2.0, fill: '#2563eb' },
  { cx: 793, cy: 413, r: 1.7, fill: '#1d4ed8' },
  { cx: 755, cy: 429, r: 1.8, fill: '#3b82f6' },
  { cx: 717, cy: 413, r: 1.4, fill: '#ef4444' },
  { cx: 701, cy: 375, r: 2.0, fill: '#60a5fa' },

  // Ring 5 (Top-Left)
  { cx: 755, cy: 151, r: 1.8, fill: '#2563eb' },
  { cx: 793, cy: 167, r: 1.5, fill: '#60a5fa' },
  { cx: 809, cy: 205, r: 2.1, fill: '#3b82f6' },
  { cx: 793, cy: 243, r: 1.6, fill: '#1d4ed8' },
  { cx: 755, cy: 259, r: 1.9, fill: '#3b82f6' },
  { cx: 717, cy: 243, r: 1.4, fill: '#ef4444' },
  { cx: 701, cy: 205, r: 1.7, fill: '#60a5fa' },
];

export default function LocationSection() {
  const [showMap, setShowMap] = useState(true);

  const googleMapsUrl =
    'https://www.google.com/maps/place/Shri+Ganesh+Welding+Works+shop+Ghatanji/@20.1441888,78.3122625,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd3b9157d1d648b:0x1efbfee1ed30f59e!8m2!3d20.1441838!4d78.3148374!16s%2Fg%2F11gm87w9rv?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D';

  const embedUrl =
    'https://maps.google.com/maps?q=20.1441838,78.3148374&hl=en&z=17&output=embed';

  return (
    <section
      id="workshop-location"
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        padding: '7rem 0 5rem 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* 1. Antigravity-Style Constellation / Particle Canvas Background */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Ambient scattered dark and light stipple dots */}
        {GENERATED_DOTS.map((dot, idx) => (
          <circle
            key={idx}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            fill="#0f172a"
            opacity={dot.opacity}
          />
        ))}

        {/* 6 Orbital Constellation Rings on Right Side (Google Antigravity style) */}
        {ORBITAL_RINGS.map((ring, idx) => (
          <g key={`ring-${idx}`}>
            {/* Outer dashed orbital circle */}
            <circle
              cx={ring.cx}
              cy={ring.cy}
              r={ring.rOuter}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.2"
              strokeDasharray="2 6"
              opacity="0.65"
            />
            {/* Inner dashed orbital circle */}
            <circle
              cx={ring.cx}
              cy={ring.cy}
              r={ring.rInner}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1"
              strokeDasharray="1.5 5"
              opacity="0.4"
            />
          </g>
        ))}

        {/* Constellation Particle Nodes on Perimeters */}
        {RING_PARTICLES.map((particle, idx) => (
          <circle
            key={`particle-${idx}`}
            cx={particle.cx}
            cy={particle.cy}
            r={particle.r}
            fill={particle.fill}
            opacity="0.9"
          />
        ))}
      </svg>

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Pill Label */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: '#f1f5f9',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#475569',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <ThreeDMapPin size={16} />
            <span>Visit Shri Ganesh Welding Works Shop Ghatanji</span>
          </div>
        </div>

        {/* 2. Dual-Column Antigravity Split Section matching the Screenshot */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            padding: '3rem 0 5rem 0',
          }}
        >
          {/* ========================================================
              LEFT COLUMN: For Homeowners & Custom Fabrication
              (Matching "For developers / Achieve new heights" & Black Button)
             ======================================================== */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '2.5rem 1.5rem',
              position: 'relative',
            }}
          >
            {/* Top Pill Tag matching "Available at no charge" */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '5px 16px',
                borderRadius: '9999px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontSize: '0.82rem',
                fontWeight: 600,
                marginBottom: '1.75rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              Available 6 Days a Week
            </div>

            {/* Bold Clean Heading matching Screenshot */}
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
                fontWeight: 600,
                color: '#000000',
                lineHeight: 1.15,
                letterSpacing: '-0.035em',
                marginBottom: '1.25rem',
                maxWidth: '520px',
              }}
            >
              For homeowners <br />
              <span style={{ fontWeight: 400, color: '#1e293b' }}>Achieve custom precision</span>
            </h2>

            {/* Clean descriptive paragraph */}
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                lineHeight: 1.65,
                maxWidth: '440px',
                marginBottom: '2rem',
              }}
            >
              Walk right into our Ghatanji workshop. Examine real 14-gauge steel samples, inspect custom decorative laser patterns, and consult master welders directly.
            </p>

            {/* Solid Black Capsule Button matching "Download" */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 36px',
                borderRadius: '9999px',
                backgroundColor: '#000000',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.18)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.28)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.18)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>Get Driving Directions</span>
            </a>

            {/* Subtle workshop contact footer */}
            <div
              style={{
                marginTop: '1.75rem',
                fontSize: '0.82rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <ModernLocationPin size={14} color="#000000" />
                <span>Ghatanji (Dist. Yavatmal)</span>
              </span>
              <span>•</span>
              <a href="tel:+919420627288" style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 94206 27288</span>
              </a>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: For Organizations & Turnkey Projects
              (Matching "For organizations / Level up your entire team" & Frosted Pill)
              Surrounded by the Orbital Particle Constellation!
             ======================================================== */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '2.5rem 1.5rem',
              position: 'relative',
            }}
          >
            {/* Top Pill Tag matching "Now Available!" */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '5px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                backgroundColor: 'rgba(239, 246, 255, 0.85)',
                color: '#2563eb',
                fontSize: '0.82rem',
                fontWeight: 600,
                marginBottom: '1.75rem',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)',
              }}
            >
              Now Contracting!
            </div>

            {/* Bold Clean Heading matching Screenshot */}
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
                fontWeight: 600,
                color: '#000000',
                lineHeight: 1.15,
                letterSpacing: '-0.035em',
                marginBottom: '1.25rem',
                maxWidth: '520px',
              }}
            >
              For organizations <br />
              <span style={{ fontWeight: 400, color: '#1e293b' }}>Level up your industrial build</span>
            </h2>

            {/* Clean descriptive paragraph */}
            <p
              style={{
                fontSize: '1rem',
                color: '#64748b',
                lineHeight: 1.65,
                maxWidth: '440px',
                marginBottom: '2rem',
              }}
            >
              Heavy PEB warehouse trusses, certified AWS welding, high-capacity gantry hoists, and turnkey on-site erection dispatched straight from our workshop facility.
            </p>

            {/* Frosted/Light Pill Button matching "Read More" */}
            <a
              href="tel:+919423032182"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 36px',
                borderRadius: '9999px',
                backgroundColor: '#f1f3f5',
                color: '#0f172a',
                fontSize: '0.95rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f3f5';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
              }}
            >
              <ThreeDPhone size={18} />
              <span>Call Project Desk: 9423032182</span>
            </a>

            {/* Subtle specs badge row */}
            <div
              style={{
                marginTop: '1.75rem',
                fontSize: '0.82rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2z" />
                </svg>
                Heavy MIDC Fabrication Yard
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                ±0.1mm CNC Fiber Laser
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                Heavy Flatbed Dispatches
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. Interactive Ghatanji Facility Hub & Map Card
            (Clean Minimalist Container below the Antigravity Pillars)
           ======================================================== */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 16px 36px -12px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
            marginTop: '1rem',
          }}
        >
          {/* Facility Specs Strip */}
          <div
            style={{
              padding: '1.75rem 2rem',
              borderBottom: '1px solid #f1f5f9',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              backgroundColor: '#fafbfc',
            }}
          >
            {/* Address */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ThreeDMapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Location Address</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px', lineHeight: 1.4 }}>
                  Shri Ganesh Welding Works Shop, Ghatanji, District Yavatmal, Maharashtra - 445301
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '3px' }}>
                  GPS: 20.1441838, 78.3148374
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ThreeDClock size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Hours of Operation</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                  Monday – Saturday: 8:30 AM – 7:30 PM
                </div>
                <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600, marginTop: '3px' }}>
                  ● Open for Direct Walk-in Visits
                </div>
              </div>
            </div>

            {/* Phone Hotlines */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ThreeDPhone size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Direct Telephone</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                  Counter: <a href="tel:+919420627288" style={{ color: '#0f172a', fontWeight: 600 }}>+91 94206 27288</a>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                  Office Desk: <a href="tel:+919423032182" style={{ color: '#0f172a', fontWeight: 600 }}>+91 94230 32182</a>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map with Floating Navigation Bar */}
          <div style={{ position: 'relative', height: '420px', width: '100%', backgroundColor: '#f1f5f9' }}>
            <iframe
              title="Shri Ganesh Welding Works Shop Ghatanji Google Maps Location"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
                width: '100%',
                height: '100%',
              }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Navigation Pill at Map Bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(15, 23, 42, 0.88)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '12px 20px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#ffffff',
                flexWrap: 'wrap',
                gap: '12px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>
                  Shri Ganesh Welding Works Shop (Ghatanji Plant)
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  District Yavatmal, Maharashtra • Coordinates: 20.1441838, 78.3148374
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <span>Navigate in Google Maps</span>
                <span style={{ fontSize: '1rem' }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
