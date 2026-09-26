'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ModernLocationPin } from '@/components/Icons';

interface CityInfo {
  name: string;
  tagline: string;
  category: string;
  distance: string;
  transitDays: string;
  services: string[];
  isHQ?: boolean;
}

const OPERATIONAL_CITIES: CityInfo[] = [
  {
    name: 'Ghatanji',
    tagline: 'Main Workshop & High-Capacity Fabrication Plant',
    category: 'Headquarters',
    distance: 'Main Facility',
    transitDays: 'Immediate / Same Day',
    services: ['Master Workshop', 'CNC Laser Cutting', 'Direct Dispatch', 'Live Sampling'],
    isHQ: true,
  },
  {
    name: 'Yavatmal',
    tagline: 'District Commercial & Residential Hub',
    category: 'Daily Route',
    distance: '38 km',
    transitDays: '1–2 Days',
    services: ['Architectural Gates', 'Staircase Railings', 'Same-Day Measurements'],
  },
  {
    name: 'Pandharkawada',
    tagline: 'Highway Industrial & Agro-Logistics Hub',
    category: 'Express Route',
    distance: '42 km',
    transitDays: '1–2 Days',
    services: ['Warehouse Sheds', 'Agro-Equipment Repair', 'On-Site Heavy Welding'],
  },
  {
    name: 'Wardha',
    tagline: 'Heavy Industrial & Institutional Steel Projects',
    category: 'Industrial Corridor',
    distance: '115 km',
    transitDays: '2–3 Days',
    services: ['Factory Trusses', 'Industrial Sheds', 'Pre-Engineered Steel'],
  },
  {
    name: 'Amravati',
    tagline: 'Architectural & Facade Landmark Projects',
    category: 'Regional Center',
    distance: '135 km',
    transitDays: '2–3 Days',
    services: ['CNC Facade Screens', 'SS 304/316 Balconies', 'Laser Cut Gates'],
  },
  {
    name: 'Nagpur',
    tagline: 'Vidarbha Metro Logistics & Commercial Supply',
    category: 'Metro Corridor',
    distance: '185 km',
    transitDays: '2–4 Days',
    services: ['Heavy Bulk Supply', 'High-Rise Railings', 'Commercial Canopy Roofs'],
  },
  {
    name: 'Chandrapur',
    tagline: 'Heavy Industrial & Thermal Power Fabrications',
    category: 'Steel Hub',
    distance: '145 km',
    transitDays: '2–3 Days',
    services: ['Structural Columns', 'Conveyor Framing', 'Industrial Pipe Welding'],
  },
  {
    name: 'Akola',
    tagline: 'Agro-Processing & Industrial Steel Corridor',
    category: 'Western Vidarbha',
    distance: '160 km',
    transitDays: '3–4 Days',
    services: ['Processing Plants', 'Motorized Heavy Gates', 'Custom Duplex Steel'],
  },
];

// 15 Circular Arc Feature Icons with modern SVG icons matching black & white workshop aesthetics
const ARC_ICONS = [
  { id: 'dispatch', label: 'Direct Factory Dispatch', desc: 'Direct from Ghatanji plant' },
  { id: 'cad', label: 'CAD Blueprints', desc: 'Custom shop drawings' },
  { id: 'aws', label: 'AWS D1.1 Certified', desc: 'Structural code compliance' },
  { id: 'laser', label: '0.5mm Fiber Laser', desc: 'High-precision cutting' },
  { id: 'delivery', label: 'Daily Delivery Routes', desc: 'Vidarbha-wide transport' },
  { id: 'bending', label: 'CNC Heavy Bending', desc: 'Hydraulic metal forming' },
  { id: 'workshop', label: 'Ghatanji Master Works', desc: 'Master fabrication workshop' },
  { id: 'sheds', label: 'Structural Steel Sheds', desc: 'PEB industrial frames' },
  { id: 'tig', label: 'Argon Purged TIG', desc: 'Pinhole-free stainless welds' },
  { id: 'hq', label: 'Yavatmal District HQ', desc: 'Central delivery node' },
  { id: 'gates', label: 'Architectural Gates', desc: 'Motorized driveway entrances' },
  { id: 'facades', label: 'Laser Cut Screens', desc: 'Exterior elevation facades' },
  { id: 'preview', label: '3D Project Preview', desc: 'On-site measurement modeling' },
  { id: 'railing', label: 'Stainless Balustrades', desc: 'Grade 304/316 Jindal SS' },
  { id: 'erection', label: 'Turnkey Erection', desc: 'Foundation to roof installation' },
];

function renderArcSvg(id: string) {
  switch (id) {
    case 'dispatch':
    case 'delivery':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case 'cad':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case 'aws':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case 'laser':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
        </svg>
      );
    case 'bending':
    case 'erection':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'workshop':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20" />
          <path d="M6 20V8l6 4V4l6 4v12" />
        </svg>
      );
    case 'sheds':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    case 'tig':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'hq':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'gates':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="3" y1="12" x2="21" y2="12" />
        </svg>
      );
    case 'facades':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'preview':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case 'railing':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="3" />
          <line x1="20" y1="21" x2="20" y2="3" />
          <line x1="2" y1="7" x2="22" y2="7" />
          <line x1="2" y1="17" x2="22" y2="17" />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 14 14" />
        </svg>
      );
  }
}

export default function OperationalCities() {
  const [activeCity, setActiveCity] = useState<CityInfo>(OPERATIONAL_CITIES[0]);
  const [hoveredArcIdx, setHoveredArcIdx] = useState<number | null>(null);

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        paddingTop: 'clamp(3.5rem, 7vw, 6rem)',
        paddingBottom: 'clamp(3.5rem, 7vw, 6rem)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="container-custom">
        {/* 1. Curved Arc of Circular Icon Buttons matching the Google Antigravity screenshot */}
        <div
          style={{
            position: 'relative',
            maxWidth: '1020px',
            margin: '0 auto 3rem auto',
            padding: '1.5rem 0.5rem 1rem 0.5rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          className="no-scrollbar"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              minWidth: '780px',
              height: '96px',
            }}
          >
            {ARC_ICONS.map((item, idx) => {
              const total = ARC_ICONS.length;
              const yOffset = Math.sin((idx / (total - 1)) * Math.PI) * 22;
              const isHovered = hoveredArcIdx === idx;

              return (
                <div
                  key={item.id}
                  style={{
                    position: 'relative',
                    transform: `translateY(${yOffset}px)`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredArcIdx(idx)}
                    onMouseLeave={() => setHoveredArcIdx(null)}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? '#000000' : '#ffffff',
                      color: isHovered ? '#ffffff' : '#0f172a',
                      border: isHovered ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: isHovered
                        ? '0 8px 20px rgba(0, 0, 0, 0.2)'
                        : '0 2px 8px rgba(0, 0, 0, 0.04)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                    }}
                    aria-label={item.label}
                  >
                    {renderArcSvg(item.id)}
                  </button>

                  {/* Tooltip on Hover */}
                  {isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 10px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        zIndex: 20,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                        pointerEvents: 'none',
                      }}
                    >
                      <span>{item.label}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Bold Headline Statement matching the Google Antigravity screenshot */}
        <div style={{ textAlign: 'center', maxWidth: '980px', margin: '0 auto clamp(2.5rem, 5vw, 4rem) auto' }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3.1rem)',
              fontWeight: 600,
              color: '#000000',
              letterSpacing: '-0.035em',
              lineHeight: 1.18,
              marginBottom: '1.25rem',
            }}
          >
            Shree Ganesh Steel is our regional fabrication network,
            delivering certified structural steel across every district in Vidarbha.
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#6b7280',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Direct dispatch from our Ghatanji manufacturing plant with dedicated transport, on-site certified erectors, and rapid emergency structural repairs.
          </p>
        </div>

        {/* 3. Interactive City Selector Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {OPERATIONAL_CITIES.map((city) => {
            const isSelected = activeCity.name === city.name;
            return (
              <button
                key={city.name}
                type="button"
                onClick={() => setActiveCity(city)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 20px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: isSelected ? '#000000' : '#f1f3f5',
                  color: isSelected ? '#ffffff' : '#111827',
                  border: isSelected ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(0, 0, 0, 0.15)' : 'none',
                }}
              >
                <ModernLocationPin size={14} color={isSelected ? '#ffffff' : '#000000'} />
                <span>{city.name}</span>
                {city.isHQ && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : '#e5e7eb',
                      color: isSelected ? '#ffffff' : '#4b5563',
                      fontWeight: 700,
                    }}
                  >
                    HQ
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 4. Active City Dispatch Details Card */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '28px',
            padding: 'clamp(1.5rem, 3.5vw, 2.75rem)',
            boxShadow: '0 8px 30px -4px rgba(0, 0, 0, 0.06)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2rem',
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
              paddingBottom: '1.75rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#6b7280',
                  marginBottom: '0.5rem',
                }}
              >
                <span>{activeCity.category}</span>
                <span>•</span>
                <span>{activeCity.distance} from Ghatanji plant</span>
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)',
                  fontWeight: 600,
                  color: '#000000',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}
              >
                {activeCity.name} Delivery Network
              </h3>
              <p style={{ color: '#4b5563', fontSize: '0.95rem' }}>{activeCity.tagline}</p>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '6px',
                backgroundColor: '#f8f9fa',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                padding: '12px 20px',
                borderRadius: '16px',
              }}
            >
              <span style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 600 }}>TRANSIT TIMELINE</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#000000' }}>
                {activeCity.transitDays}
              </span>
            </div>
          </div>

          {/* Key Services for Selected District */}
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              Fabrication Services Active in {activeCity.name}:
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {activeCity.services.map((svc, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#f1f3f5',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#111827',
                  }}
                >
                  ✓ {svc}
                </div>
              ))}
            </div>
          </div>

          {/* Action Trigger Buttons for Selected City */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              paddingTop: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>
                Direct factory truck dispatch available to {activeCity.name}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link
                href="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '11px 24px',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1f2937')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
              >
                <span>Browse Products</span>
                <span>→</span>
              </Link>

              <a
                href="tel:+919423032182"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#f1f3f5',
                  color: '#111827',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '11px 22px',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f3f5')}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call Plant</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
