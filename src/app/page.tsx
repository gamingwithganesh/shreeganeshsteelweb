'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LatestBlogsCarousel from '@/components/LatestBlogsCarousel';
import { SERVICES } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcon';
import {
  ThreeDBolt,
  ThreeDMapPin,
  ThreeDPhone,
  ThreeDStar,
  ThreeDLaser,
  ThreeDShield,
  ThreeDFactory,
  ThreeDStructural,
  ThreeDGate,
} from '@/components/ThreeDIcons';
import OperationalCities from '@/components/OperationalCities';
import LocationSection from '@/components/LocationSection';
import HomeShoppingSection from '@/components/HomeShoppingSection';
import EngineeredSolutionsShowcase from '@/components/EngineeredSolutionsShowcase';
import EngineeringArtisanSection from '@/components/EngineeringArtisanSection';
import HeroTypewriterHeadline from '@/components/HeroTypewriterHeadline';
import { IconPhone } from '@/components/Icons';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000', overflow: 'hidden' }}>
      {/* Hero Section - Clean Modern Black & White Design */}
      <section
        style={{
          position: 'relative',
          minHeight: '82vh',
          marginTop: '-76px',
          paddingTop: 'clamp(115px, 16vh, 160px)',
          paddingBottom: 'clamp(3rem, 7vw, 5.5rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
            {/* Eyebrow Pill Badge: Modern Minimalist Steel & Fabrication Marker */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#f1f3f5',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '7px clamp(12px, 3vw, 20px)',
              borderRadius: '9999px',
              fontSize: 'clamp(0.72rem, 2.4vw, 0.825rem)',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '1.75rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
              letterSpacing: '0.04em',
              maxWidth: '100%',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', flexShrink: 0 }} />
            <span>SHREE GANESH STEEL • PRECISION FABRICATION &amp; WELDING</span>
          </div>

          {/* Typewriter Animated Headline */}
          <HeroTypewriterHeadline />

          {/* Centered Modern Pill Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '9999px',
                backgroundColor: '#000000',
                color: '#ffffff',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1f2937';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Explore Steel Catalog</span>
            </Link>

            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '9999px',
                backgroundColor: '#f1f3f5',
                color: '#111827',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f3f5';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Request Fabrication Quote</span>
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </Link>

            <a
              href="tel:+919423032182"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 26px',
                fontSize: '0.95rem',
                fontWeight: 600,
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                color: '#111827',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#000000';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <IconPhone size={16} />
              <span>Call +91 94230 32182</span>
            </a>
          </div>
        </div>
      </div>
    </section>

      {/* Engineering Credentials Strip */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(0, 0, 0, 0.06)', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', padding: '2.5rem 0' }}>
        <div className="container-custom">

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: '#000000' }}>
                25+
              </div>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 600, letterSpacing: '0.04em' }}>YEARS LEGACY</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: '#000000' }}>
                4,500+
              </div>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 600, letterSpacing: '0.04em' }}>PROJECTS DELIVERED</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: '#000000' }}>
                0.5mm
              </div>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 600, letterSpacing: '0.04em' }}>LASER PRECISION</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: '#000000' }}>
                100%
              </div>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 600, letterSpacing: '0.04em' }}>CUSTOM FABRICATED</div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineered Solutions Showcase - Modern Split Header & Giant Rounded Image Cards */}
      <EngineeredSolutionsShowcase />

      {/* Operational Cities & Vidarbha Delivery Network with Scrolling Animation */}
      <OperationalCities />

      {/* Interactive E-Commerce & Fabrication Shopping Section */}
      <HomeShoppingSection />

      {/* Engineering Strength with an Artisan’s Eye - Antigravity Showcase */}
      <EngineeringArtisanSection />

      {/* Latest Blogs Carousel - Antigravity Inspired Horizontal Flow */}
      <LatestBlogsCarousel />

      {/* Workshop Location & Interactive Map Section */}
      <LocationSection />

      {/* Quick Consultation CTA - Premium Monochromatic Obsidian */}
      <section
        style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '6rem 0',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container-custom">
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#94a3b8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              [ DIRECT WORKSHOP ENGINEERING ]
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
              Have a Blueprint or Need Custom Fabrication?
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: '2.5rem' }}>
              Get direct technical advice from our workshop master engineer. We provide site inspections, CAD drawings,
              and upfront transparent cost estimates with verified ±0.5mm tolerances.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  fontWeight: 700,
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.95rem',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.15s ease',
                }}
              >
                Get an Instant Free Quote →
              </Link>
              <a
                href="tel:+919423032182"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  padding: '0.85rem 1.8rem',
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                <ThreeDPhone size={18} /> Office: +91 94230 32182
              </a>
              <a
                href="tel:+919420627288"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  padding: '0.85rem 1.8rem',
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                <ThreeDPhone size={18} /> Shop: +91 94206 27288
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
